import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    addAdClick,
    addAdImpression,
    getActiveAdsByLocation,
    getFullscreenMobileAd,
} from './ads.service'
import { EnumAdLocationType } from '../campaignAd/campaignAd.model'
import { getCampaignUrl } from '../campaign/campaign.service'

export async function getAdsHandler(
    req: Request<{ location: EnumAdLocationType }>,
    res: Response
) {
    const { location } = req.params
    if (location === 'mobile_fullscreen') {
        const cookieFullscreenAdId = req.cookies['fullscreen_id']
        if (cookieFullscreenAdId) {
            return res.status(StatusCodes.OK).send(false)
        } else {
            const fullscreenAd = await getFullscreenMobileAd()
            if (fullscreenAd) {
                res.cookie('fullscreen_id', fullscreenAd.id, {
                    maxAge: 36000000, //10h
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'none'
                })
            }

            return res.status(StatusCodes.OK).send(fullscreenAd ?? false)
        }
    } else {
        const ads = await getActiveAdsByLocation(location)
        if (!ads || ads.length === 0)
            return res.status(StatusCodes.OK).send(false)

        if (ads.length === 1) {
            return res.status(StatusCodes.OK).send(ads[0])
        } else {
            return res
                .status(StatusCodes.OK)
                .send(ads[Math.floor(Math.random() * ads.length)])
        }
    }
}

export async function adImpressionHandler(
    req: Request<{ adId: string; campaignId: string }, {}, {}>,
    res: Response
) {
    try {
        const { adId, campaignId } = req.params
        await addAdImpression(parseInt(adId), parseInt(campaignId)).catch(
            (e) => {}
        )
        return res.status(StatusCodes.OK).send('success')
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}

export async function adClickHandler(
    req: Request<{ adId: string; campaignId: string }, {}, {}>,
    res: Response
) {
    try {
        const { adId, campaignId } = req.params
        await addAdClick(parseInt(adId), parseInt(campaignId))
        const campaign = await getCampaignUrl(parseInt(campaignId))
        return res.redirect(campaign.url)
    } catch (e: any) {
        return res
            .status(StatusCodes.CONFLICT)
            .send('Oops.. something went wrong')
    }
}
