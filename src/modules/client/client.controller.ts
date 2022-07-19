import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { createClient, getClients } from './client.service'
import { MongoServerError } from 'mongodb'
import { CreateClientBody } from './client.schema'
//import { createCampaign, getCampaigns, getCampaign } from "./campaign.service";
//import { RegisterCampaignBody, RegisterCampaignParams } from './campaign.schema';
//import { UpdateVideoBody, UpdateVideoParams } from "./video.schema";

export async function getClientsHandler(req: Request, res: Response) {
    const clients = await getClients()
    return res.status(StatusCodes.OK).send(clients)
}

export async function createClientsHandler(
    req: Request<{}, {}, CreateClientBody>,
    res: Response
) {
    try {
        const { name } = req.body

        console.log(name, 'BODY')

        const client = await createClient({ name: name })
        return res.status(StatusCodes.OK).send(client)
    } catch (e: any) {
        if (e instanceof MongoServerError && e.code === 11000) {
            console.error('Duplicate Data Found: \n', e.message)
            return res
                .status(StatusCodes.CONFLICT)
                .send('Duplicate Data Found: \n' + e.message)
        } else {
            throw new Error(e)
        }
    }
}
