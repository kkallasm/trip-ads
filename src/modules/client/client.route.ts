import express from 'express'
import {
    createClientsHandler,
    deleteClientHandler,
    getClientHandler,
    getClientsHandler,
    updateClientsHandler,
} from './client.controller'
import {validateRequestBody} from '../../middleware/validateRequest'
import {
    clientSchema,
    deleteClientSchema,
    updateClientSchema
} from './client.schema';

const router = express.Router()

router.get('/', getClientsHandler)
router.get('/:clientId', getClientHandler)
router.post('/', validateRequestBody(clientSchema), createClientsHandler)
router.patch(
    '/:clientId',
    validateRequestBody(updateClientSchema),
    updateClientsHandler
)
router.delete(
    '/:clientId',
    validateRequestBody(deleteClientSchema),
    deleteClientHandler
)

export default router
