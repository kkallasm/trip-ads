import express from 'express'
import {
    getCampaignHandler,
    getCampaignsHandler,
    createCampaignHandler,
    updateCampaignHandler,
} from './campaign.controller'
import validateRequest from '../../middleware/validateRequest'
import { campaignSchema } from './campaign.schema'

const router = express.Router()

router.get('/', getCampaignsHandler)
router.post('/', createCampaignHandler)
router.get('/:campaignId', getCampaignHandler)
router.patch(
    '/:campaignId',
    validateRequest(campaignSchema),
    updateCampaignHandler
)

export default router
