import express from 'express'
import {
    getCampaignHandler,
    getCampaignsHandler,
    createCampaignHandler,
    updateCampaignHandler,
} from './campaign.controller'
import validateRequest from '../../middleware/validateRequest'
import { campaignCreateSchema, campaignUpdateSchema } from './campaign.schema'

const router = express.Router()

router.get('/', getCampaignsHandler)
router.post('/', validateRequest(campaignCreateSchema), createCampaignHandler)
router.get('/:campaignId', getCampaignHandler)
router.patch(
    '/:campaignId',
    validateRequest(campaignUpdateSchema),
    updateCampaignHandler
)

export default router
