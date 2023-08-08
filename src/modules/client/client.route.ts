import express from 'express'
import {
    createClientsHandler,
    deleteClientHandler,
    getClientHandler,
    getClientsHandler,
    updateClientsHandler,
} from './client.controller'
import { clientSchema } from './client.schema'
import { validateRequest } from "../../middleware/validateRequest";

const router = express.Router()

router.get('/', getClientsHandler)
router.get('/:clientId', getClientHandler)
router.post('/', validateRequest(clientSchema), createClientsHandler)
router.patch(
    '/:clientId',
    validateRequest(clientSchema),
    updateClientsHandler
)
router.delete(
    '/:clientId',
    deleteClientHandler
)

export default router
