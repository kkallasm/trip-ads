import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createCampaign, getCampaigns, getCampaign } from "./campaign.service";
import { RegisterCampaignBody, RegisterCampaignParams } from './campaign.schema';
//import { UpdateVideoBody, UpdateVideoParams } from "./video.schema";

export async function getCampaignsHandler(req: Request, res: Response) {
    //const campaigns = await getCampaigns();

    //return res.status(StatusCodes.OK).send(campaigns)

    return res.status(StatusCodes.OK).send('kampaaniad')
}

export async function updateCampaignHandler(
    req: Request<RegisterCampaignParams, {}, RegisterCampaignBody>,
    res: Response
) {
    const { campaignId } = req.params;
    const { name, client, startDate } = req.body;

    const campaign = await getCampaign(parseInt(campaignId))

    if (!campaign) {
        return res.status(StatusCodes.NOT_FOUND).send("Campaign not found");
    }

    /*video.title = title;
    video.description = description;
    video.published = published;

    await video.save();*/

    return res.status(StatusCodes.OK).send(campaign);
}