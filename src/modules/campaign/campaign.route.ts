import express from 'express'
import {
    getCampaignHandler,
    getCampaignsHandler,
    createCampaignHandler,
    updateCampaignHandler,
} from './campaign.controller'
import { validateRequestBody } from '../../middleware/validateRequest'
import { campaignSchemaBody } from './campaign.schema'

const router = express.Router()

router.get('/', getCampaignsHandler)
router.post('/', validateRequestBody(campaignSchemaBody), createCampaignHandler)
router.get('/:campaignId', getCampaignHandler)
router.patch(
    '/:campaignId',
    validateRequestBody(campaignSchemaBody),
    updateCampaignHandler
)

export default router
