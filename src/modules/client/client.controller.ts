import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { clientRequest } from './client.request'
import {
    createClient,
    deleteClient,
    getAllClients,
    getClient,
    updateClient,
} from './client.service'

export async function getClientsHandler(req: Request, res: Response) {
    const clients = await getAllClients()
    return res.status(StatusCodes.OK).send(clients)
}

export async function getClientHandler(
    req: Request<{ clientId: number }>,
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
    req: Request<{}, {}, clientRequest['body']>,
    res: Response
) {
    try {
        const { name } = req.body
        const newClient = await createClient(name)
        return res.status(StatusCodes.OK).send(newClient)
    } catch (e: any) {
        if (e?.code === '23505') {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send('Client "' + req.body.name + '" already exists')
        } else {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(e?.message)
        }
    }
}

export async function updateClientsHandler(
    req: Request<{ clientId: string }, {}, clientRequest['body']>,
    res: Response
) {
    try {
        const { clientId } = req.params
        const { name } = req.body
        const client = await getClient(parseInt(clientId))
        if (!client) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }

        const updatedClient = await updateClient(client.id, name)
        return res.status(StatusCodes.OK).send(updatedClient)
    } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e?.message)
    }
}

export async function deleteClientHandler(
    req: Request<{ clientId: string }>,
    res: Response
) {
    try {
        const { clientId } = req.params
        const client = await getClient(parseInt(clientId))
        if (!client) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }

        await deleteClient(parseInt(clientId))
        return res.sendStatus(StatusCodes.OK)
    } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e?.message)
    }
}
