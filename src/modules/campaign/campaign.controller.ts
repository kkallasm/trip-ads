import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    getCampaign,
    createCampaign,
    updateCampaign,
    getAllCampaigns,
} from './campaign.service'
import { campaignAddRequest, campaignUpdateRequest } from './campaign.request'
import { getAllClients } from '../client/client.service'
import { Campaign } from './campaign.model'

export async function getCampaignsHandler(req: Request, res: Response) {
    const campaigns = await getAllCampaigns()
    const clients = await getAllClients()
    return res
        .status(StatusCodes.OK)
        .send({ campaigns: campaigns, clients: clients })
}

export async function getCampaignHandler(
    req: Request<{ campaignId: string }>,
    res: Response
) {
    const { campaignId } = req.params
    const campaign = await getCampaign(parseInt(campaignId))
    if (!campaign) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    return res.status(StatusCodes.OK).send(campaign)
}

export async function createCampaignHandler(
    req: Request<{}, {}, campaignAddRequest['body']>,
    res: Response
) {
    try {
        const { name, clientId, startDate, endDate, url } = req.body
        let campaign: Campaign = await createCampaign({
            name: name,
            client_id: clientId,
            start_date: startDate,
            end_date: endDate,
            url: url,
        })

        return res.status(StatusCodes.OK).send(campaign)
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}

export async function updateCampaignHandler(
    req: Request<
        campaignUpdateRequest['params'],
        {},
        campaignUpdateRequest['body']
    >,
    res: Response
) {
    const { campaignId } = req.params
    const { name, clientId, startDate, endDate, url } = req.body
    try {
        const campaign = await updateCampaign(parseInt(campaignId), {
            name: name,
            client_id: clientId,
            start_date: startDate,
            end_date: endDate,
            url: url,
        })

        if (!campaign) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }

        return res.status(StatusCodes.OK).send(campaign)
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}
