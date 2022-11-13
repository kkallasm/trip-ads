import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    createCampaign,
    getCampaigns,
    getCampaign,
    updateCampaign,
} from './campaign.service'
import { campaignRequestParams, campaignRequestBody } from './campaign.schema';

export async function getCampaignsHandler(req: Request, res: Response) {
    const campaigns = await getCampaigns()

    return res.status(StatusCodes.OK).send(campaigns)
}

export async function getCampaignHandler(
    req: Request<campaignRequestParams>,
    res: Response
) {
    const { campaignId } = req.params
    const campaign = await getCampaign(campaignId)
    if (!campaign) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    return res.status(StatusCodes.OK).send(campaign)
}

export async function createCampaignHandler(
    req: Request<{}, {}, campaignRequestBody>,
    res: Response
) {
    try {
        const { name, client, startDate, endDate, targetUrl } = req.body
        const campaign = await createCampaign({
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

export async function updateCampaignHandler(
    req: Request<campaignRequestParams, {}, campaignRequestBody>,
    res: Response
) {
    const { campaignId } = req.params
    const { name, client, startDate, endDate, targetUrl } = req.body

    try {
        const campaign = await updateCampaign(campaignId, {
            name: name,
            client: client,
            startDate: startDate,
            endDate: endDate,
            targetUrl: targetUrl
        })

        if (!campaign) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }

        campaign.name = name
        campaign.client = client
        //campaign.startDate = startDate

        await campaign.save()
        return res.status(StatusCodes.OK).send(campaign)
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}
