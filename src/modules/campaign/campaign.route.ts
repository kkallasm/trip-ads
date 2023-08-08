import express from 'express'
import {
    getCampaignHandler,
    getCampaignsHandler,
    createCampaignHandler,
    updateCampaignHandler,
} from './campaign.controller'
import { validateRequest } from "../../middleware/validateRequest";
import { campaignSchemaBody } from './campaign.schema'
import {
    createCampaignAdHandler,
    getCampaignAdsHandler,
    updateCampaignAdHandler,
} from '../campaignAd/campaignAd.controller'
import {
    campaignAdAddSchema,
    campaignAdUpdateSchema
} from "../campaignAd/campaignAd.schema";
const router = express.Router()

router.get('/', getCampaignsHandler)
router.post('/', validateRequest(campaignSchemaBody), createCampaignHandler)
router.get('/:campaignId', getCampaignHandler)
router.patch('/:campaignId', validateRequest(campaignSchemaBody), updateCampaignHandler)

router.get('/:campaignId/ads', getCampaignAdsHandler)
router.post('/:campaignId/ads', validateRequest(campaignAdAddSchema), createCampaignAdHandler)
router.patch('/:campaignId/ads/:adId', validateRequest(campaignAdUpdateSchema), updateCampaignAdHandler)

export default router
