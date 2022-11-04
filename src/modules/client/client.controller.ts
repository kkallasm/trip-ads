import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { MongoServerError } from 'mongodb'
import { ClientInput } from './client.schema'
import {
    createClient,
    deleteClient,
    getClient,
    getClients,
} from './client.service'

export async function getClientsHandler(req: Request, res: Response) {
    const clients = await getClients()
    return res.status(StatusCodes.OK).send(clients)
}

export async function getClientHandler(
    req: Request<{clientId: string}>,
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
    req: Request<{}, {}, ClientInput>,
    res: Response
) {
    try {
        const { name } = req.body
        const client = await createClient({ name: name })
        return res.status(StatusCodes.OK).send(client)
    } catch (e: any) {
        if (e instanceof MongoServerError && e.code === 11000) {
            return res.status(StatusCodes.CONFLICT).send({
                error: {
                    name: ['Selline klient on juba olemas']
                }
            })
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e?.message)
        }
    }
}

export async function updateClientsHandler(
    req: Request<{clientId: string}, {}, ClientInput>,
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
            return res.status(StatusCodes.CONFLICT).send({
                error: {
                    name: ['Selline klient on juba olemas']
                }
            })
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e?.message)
        }
    }
}

export async function deleteClientHandler(
    req: Request<{clientId: string}>,
    res: Response
) {
    try {
        const { clientId } = req.params
        const client = await getClient(clientId)
        if (!client) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }

        await deleteClient(clientId)
        return res.sendStatus(StatusCodes.OK)
    } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e?.message)
    }
}
