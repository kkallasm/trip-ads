import express from 'express'
import {
    createClientsHandler,
    deleteClientHandler,
    getClientHandler,
    getClientsHandler,
    updateClientsHandler,
} from './client.controller'
import validateRequest from '../../middleware/validateRequest'
import {
    createClientSchema,
    deleteClientSchema,
    updateClientSchema,
} from './client.schema'

const router = express.Router()

router.get('/', getClientsHandler)
router.get('/:clientId', getClientHandler)
router.post('/', validateRequest(createClientSchema), createClientsHandler)
router.patch(
    '/:clientId',
    validateRequest(updateClientSchema),
    updateClientsHandler
)
router.delete(
    '/:clientId',
    validateRequest(deleteClientSchema),
    deleteClientHandler
)

export default router
