import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    //createCampaignAd,
    //getCampaignAd,
    //getCampaignAdsByCampaignId,
} from './campaignAd.service'
import {
    campaignAdRequestParams,
    campaignAdRequestBody,
} from './campaignAd.schema'
import { getCampaign } from '../campaign/campaign.service';

/*export async function getCampaignAdsHandler(
    req: Request<campaignAdRequestParams>,
    res: Response,
    next: any
) {
    try {
        const { campaignId } = req.params
        const campaign = await getCampaign(campaignId)
        if (!campaign) {
            return res.status(StatusCodes.NOT_FOUND).send('Campaign not found')
        }

        const campaigns = await getCampaignAdsByCampaignId(campaignId)
        return res.status(StatusCodes.OK).send(campaigns)
    } catch (e) {
        next(e)
    }
}*/

/*export async function getCampaignAdHandler(
    req: Request<{ campaignId: string; adId: string }>,
    res: Response
) {
    const { campaignId, adId } = req.params
    const campaign = await getCampaign(campaignId)
    if (!campaign) {
        return res.status(StatusCodes.NOT_FOUND).send('Campaign not found')
    }

    const campaignAd = await getCampaignAd(adId)
    if (!campaignAd) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    return res.status(StatusCodes.OK).send(campaignAd)
}*/

/*export async function createCampaignAdHandler(
    req: Request<{}, {}, campaignAdRequestBody>,
    res: Response
) {
    try {
        const { campaign, location, imageName } = req.body
        const campaignAd = await createCampaignAd({
            campaign: campaign,
            location: location,
            imageName: imageName,
        })

        //await updateCampaignLocations(campaign, location)
        await updateCampaignAds(campaign, campaignAd)

        return res.status(StatusCodes.OK).send(campaignAd)
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}*/
