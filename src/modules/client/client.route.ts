import express from 'express'
import {
    createClientsHandler,
    deleteClientHandler,
    getClientHandler,
    getClientsHandler,
    updateClientsHandler,
} from './client.controller'
import { clientRequest } from './client.request'
import { validateRequest } from "../../middleware/validateRequest";

const router = express.Router()

router.get('/', getClientsHandler)
router.get('/:clientId', getClientHandler)
router.post('/', validateRequest(clientRequest), createClientsHandler)
router.patch(
    '/:clientId',
    validateRequest(clientRequest),
    updateClientsHandler
)
router.delete(
    '/:clientId',
    deleteClientHandler
)

export default router
