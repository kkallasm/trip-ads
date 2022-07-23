import express from 'express'
import { createClientsHandler, getClientsHandler, updateClientsHandler } from './client.controller';
import validateRequest from '../../middleware/validateRequest'
import { createClientSchema, updateClientSchema } from './client.schema';

const router = express.Router()

router.get('/', getClientsHandler)
router.post('/', validateRequest(createClientSchema), createClientsHandler)
router.patch('/:clientId', validateRequest(updateClientSchema), updateClientsHandler)

export default router
