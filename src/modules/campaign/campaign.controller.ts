import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    getCampaign,
    createCampaign,
    getCampaigns,
    updateCampaign
} from './campaign.service';
import { campaignAddRequest, campaignUpdateRequest } from './campaign.schema';
import {getClients} from "../client/client.service";

export async function getCampaignsHandler(req: Request, res: Response) {
    const campaigns = await getCampaigns()
    const clients = await getClients()
    return res.status(StatusCodes.OK).send({
        campaigns: campaigns,
        clients: clients
    })
}

export async function getCampaignHandler(
    req: Request<{campaignId: string}>,
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
    req: Request<{}, {}, campaignAddRequest['body']>,
    res: Response
) {
    try {
        const { name, clientId, startDate, endDate, url } = req.body
        let campaign = await createCampaign({
            name: name,
            client: clientId,
            startDate: startDate,
            endDate: endDate,
            url: url
        })

        campaign = await campaign.populate('client', {name})
        return res.status(StatusCodes.OK).send(campaign)
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}

export async function updateCampaignHandler(
    req: Request<campaignUpdateRequest['params'], {}, campaignUpdateRequest['body']>,
    res: Response
) {
    const { campaignId } = req.params
    const { name, clientId, startDate, endDate, url } = req.body
    try {
        const campaign = await updateCampaign(campaignId, {
            name: name,
            client: clientId,
            startDate: startDate,
            endDate: endDate,
            url: url
        })

        if (!campaign) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }

        return res.status(StatusCodes.OK).send(campaign)
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}
