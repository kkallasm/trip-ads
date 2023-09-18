import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    addAdClick,
    addAdImpression,
    getActiveAdsByLocation
} from "./ads.service";
import { EnumAdLocationType } from "../campaignAd/campaignAd.model";
import { getCampaignUrl } from "../campaign/campaign.service";

export async function getAdsHandler(
    req: Request<{ location: EnumAdLocationType }>,
    res: Response
) {
    const { location } = req.params
    const ads = await getActiveAdsByLocation(location)
    if (!ads || ads.length === 0)
        return res.status(StatusCodes.OK).send(false)

    if (ads.length === 1) {
        return res.status(StatusCodes.OK).send(ads[0])
    } else {
        return res.status(StatusCodes.OK).send(ads[(Math.floor(Math.random() * ads.length))])
    }
}

export async function adImpressionHandler(
    req: Request<{ adId: string, campaignId: string }, {}, {}>,
    res: Response
) {
    try {
        const { adId, campaignId } = req.params
        await addAdImpression(parseInt(adId), parseInt(campaignId)).catch(e => {})
        return res.status(StatusCodes.OK).send('success')
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}

export async function adClickHandler(
    req: Request<{ adId: string, campaignId: string }, {}, {}>,
    res: Response
) {
    try {
        const { adId, campaignId } = req.params
        await addAdClick(parseInt(adId), parseInt(campaignId))
        const campaign = await getCampaignUrl(parseInt(campaignId))
        return res.redirect(campaign.url)
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send('Oops.. something went wrong')
    }
}
