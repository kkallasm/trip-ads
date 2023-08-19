import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    addAdClick,
    addAdImpression,
    getActiveAdsByLocation,
    getCampaignByAdId
} from "./ads.service";
import { EnumAdLocationType } from "../campaignAd/campaignAd.model";

export async function getAdsHandler(
    req: Request<{ location: EnumAdLocationType }>,
    res: Response
) {
    const { location } = req.params
    const ads = await getActiveAdsByLocation(location)
    if (!ads)
        return res.status(StatusCodes.OK).send(false)

    if (ads.length === 1) {
        return res.status(StatusCodes.OK).send(ads[0])
    } else {
        return res.status(StatusCodes.OK).send(ads[(Math.floor(Math.random() * ads.length))])
    }
}

export async function adImpressionHandler(
    req: Request<{ adId: string }, {}, { campaignId: string; data: any }>,
    res: Response
) {
    try {
        const { adId } = req.params
        const { campaignId, data } = req.body

        await addAdImpression(adId, campaignId, data)
        return res.status(StatusCodes.OK).send('success')
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}

export async function adClickHandler(
    req: Request<{ adId: string }, {}, {}>,
    res: Response
) {
    try {
        const { adId } = req.params
        const campaign = await getCampaignByAdId(adId)
        if (campaign) {
            await addAdClick(adId, campaign._id)
            return res.status(StatusCodes.OK).send(campaign.url)
        } else return res.sendStatus(StatusCodes.CONFLICT)
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}
