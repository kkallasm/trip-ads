import express from 'express'
import {
    createClientsHandler,
    getClientHandler,
    getClientsHandler,
    updateClientsHandler,
} from './client.controller'
import validateRequest from '../../middleware/validateRequest'
import { createClientSchema, updateClientSchema } from './client.schema'

const router = express.Router()

router.get('/', getClientsHandler)
router.get('/:clientId', getClientHandler)
router.post('/', validateRequest(createClientSchema), createClientsHandler)
router.patch(
    '/:clientId',
    validateRequest(updateClientSchema),
    updateClientsHandler
)

export default router
