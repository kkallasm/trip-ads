import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    addAdClick,
    addAdImpression,
    getActiveAdsByLocation, getAdUrl,
    getFullscreenMobileAd
} from "./ads.service";
import { EnumAdLocationType } from '../campaignAd/campaignAd.model'

export async function getAdsHandler(
    req: Request<{ location: EnumAdLocationType }>,
    res: Response
) {
    const { location } = req.params
    if (location === 'mobile_fullscreen') {
        const fullscreenAd = await getFullscreenMobileAd()
        return res.status(StatusCodes.OK).send(fullscreenAd ?? false)
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
        const url = await getAdUrl(parseInt(adId))
        return res.redirect(url)
    } catch (e: any) {
        return res
            .status(StatusCodes.CONFLICT)
            .send('Oops.. something went wrong')
    }
}
