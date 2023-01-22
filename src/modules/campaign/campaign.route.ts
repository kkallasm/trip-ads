import express from 'express'
import {
    getCampaignHandler,
    getCampaignsHandler,
    createCampaignHandler,
    updateCampaignHandler,
    getCampaignAdsHandler,
    createCampaignAdHandler,
    updateCampaignAdHandler
} from './campaign.controller';
import { validateRequestBody } from '../../middleware/validateRequest'
import { campaignSchemaBody } from './campaign.schema'
import { adSchemaBody } from '../ads/ad.schema';

const router = express.Router()

router.get('/', getCampaignsHandler)
router.post('/', validateRequestBody(campaignSchemaBody), createCampaignHandler)
router.get('/:campaignId', getCampaignHandler)
router.patch(
    '/:campaignId',
    validateRequestBody(campaignSchemaBody),
    updateCampaignHandler
)
router.get('/:campaignId/ads', getCampaignAdsHandler)
router.post('/:campaignId/ads', validateRequestBody(adSchemaBody), createCampaignAdHandler)
router.patch('/:campaignId/ads/:adId', updateCampaignAdHandler)

export default router
