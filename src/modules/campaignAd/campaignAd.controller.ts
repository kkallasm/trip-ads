import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    createCampaignAd,
    getCampaignAds,
    getCampaignAd
} from './campaignAd.service'
import { campaignAdRequestParams, campaignAdRequestBody } from './campaignAd.schema';

export async function getCampaignAdsHandler(req: Request, res: Response) {
    const campaigns = await getCampaignAds()

    return res.status(StatusCodes.OK).send('success')
}

export async function getCampaignAdHandler(
    req: Request<campaignAdRequestParams>,
    res: Response
) {
    const { campaignId } = req.params
    const campaign = await getCampaignAd(campaignId)
    if (!campaign) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    return res.status(StatusCodes.OK).send(campaign)
}

export async function createCampaignAdHandler(
    req: Request<{}, {}, campaignAdRequestBody>,
    res: Response
) {
    try {
        const { name, client, startDate, endDate, targetUrl } = req.body
        const campaign = await createCampaignAd({
            name: name,
            client: client,
            startDate: startDate,
            endDate: endDate,
            targetUrl: targetUrl,
        })

        return res.status(StatusCodes.OK).send(campaign)

    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}
