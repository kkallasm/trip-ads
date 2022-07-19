import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
//import { createCampaign, getCampaigns, getCampaign } from "./campaign.service";
//import { RegisterCampaignBody, RegisterCampaignParams } from './campaign.schema';
//import { UpdateVideoBody, UpdateVideoParams } from "./video.schema";

export async function getClientsHandler(req: Request, res: Response) {
    //const campaigns = await getCampaigns();

    //return res.status(StatusCodes.OK).send(campaigns)

    return res.status(StatusCodes.OK).send('Kliendid')
}