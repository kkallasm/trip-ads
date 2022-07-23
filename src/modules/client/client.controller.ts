import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { MongoServerError } from 'mongodb'
import { CreateClientInput, UpdateClientInput } from './client.schema';
import { createClient, getClient, getClients } from './client.service'

export async function getClientsHandler(req: Request, res: Response) {
    const clients = await getClients()
    return res.status(StatusCodes.OK).send(clients)
}

export async function getClientHandler(
    req: Request<UpdateClientInput['params']>,
    res: Response
) {
    const { clientId } = req.params
    const client = await getClient(clientId)

    if (!client) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    return res.status(StatusCodes.OK).send(client)
}

export async function createClientsHandler(
    req: Request<{}, {}, CreateClientInput['body']>,
    res: Response
) {
    try {
        const { name } = req.body
        const client = await createClient({ name: name })
        return res.status(StatusCodes.OK).send(client)
    } catch (e: any) {
        if (e instanceof MongoServerError && e.code === 11000) {
            return res
                .status(StatusCodes.CONFLICT)
                .send('Duplicate Data Found: \n' + e.message)
        } else {
            throw new Error(e)
        }
    }
}

export async function updateClientsHandler(
    req: Request<UpdateClientInput['params'], {}, UpdateClientInput['body']>,
    res: Response
) {
    try {
        const { clientId } = req.params
        const { name } = req.body
        const client = await getClient(clientId)

        if (!client) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }

        client.name = name

        await client.save()

        return res.status(StatusCodes.OK).send(client)
    } catch (e: any) {
        if (e instanceof MongoServerError && e.code === 11000) {
            return res
                .status(StatusCodes.CONFLICT)
                .send('Duplicate Data Found: \n' + e.message)
        } else {
            throw new Error(e)
        }
    }
}
