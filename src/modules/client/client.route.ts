import express from 'express'
import { createClientsHandler, getClientsHandler } from './client.controller'
import validateRequest from '../../middleware/validateRequest';
import { createClientSchema } from './client.schema';

const router = express.Router()

router.get('/', getClientsHandler)
router.post('/', validateRequest(createClientSchema), createClientsHandler)

export default router
