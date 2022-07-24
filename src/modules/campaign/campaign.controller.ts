import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createCampaign, getCampaigns, getCampaign } from "./campaign.service";
import { CampaignSchema } from './campaign.schema';

export async function getCampaignsHandler(req: Request, res: Response) {
    const campaigns = await getCampaigns()

    return res.status(StatusCodes.OK).send(campaigns)
}

export async function getCampaignHandler(req: Request<CampaignSchema['params']>, res: Response) {
    const { campaignId } = req.params

    const campaign = await getCampaign(campaignId)

    if (!campaign) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    return res.status(StatusCodes.OK).send(campaign)
}

export async function updateCampaignHandler(
    req: Request<CampaignSchema['params'], {}, CampaignSchema['body']>,
    res: Response
) {
    const { campaignId } = req.params
    const { name, client, startDate } = req.body

    const campaign = await getCampaign(campaignId)

    if (!campaign) {
        return res.status(StatusCodes.NOT_FOUND).send("Campaign not found");
    }

    campaign.name = name;
    campaign.client = client;
    campaign.startDate = startDate;

    await campaign.save()

    return res.status(StatusCodes.OK).send(campaign);
}