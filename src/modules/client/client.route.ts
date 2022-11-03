import express from 'express'
import {
    createClientsHandler,
    deleteClientHandler,
    getClientHandler,
    getClientsHandler,
    updateClientsHandler,
} from './client.controller'
import {validateRequestBody} from '../../middleware/validateRequest'
import { clientSchema } from './client.schema'

const router = express.Router()

router.get('/', getClientsHandler)
router.get('/:clientId', getClientHandler)
router.post('/', validateRequestBody(clientSchema), createClientsHandler)
router.patch(
    '/:clientId',
    validateRequestBody(clientSchema),
    updateClientsHandler
)
router.delete(
    '/:clientId',
    deleteClientHandler
)

export default router
