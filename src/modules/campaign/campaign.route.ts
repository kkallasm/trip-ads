import express from 'express'
import {
    getCampaignHandler,
    getCampaignsHandler,
    createCampaignHandler,
    updateCampaignHandler,
} from './campaign.controller'
import { validateRequest } from "../../middleware/validateRequest";
import { campaignAddSchema, campaignUpdateSchema } from './campaign.request'
import {
    createCampaignAdHandler,
    getCampaignAdsHandler,
    setCampaignAdActiveHandler,
    updateCampaignAdHandler
} from "../campaignAd/campaignAd.controller";
import {
    campaignAdAddSchema,
    campaignAdActiveSchema,
    campaignAdUpdateSchema
} from "../campaignAd/campaignAd.schema";
const router = express.Router()

router.get('/', getCampaignsHandler)
router.post('/', validateRequest(campaignAddSchema), createCampaignHandler)
router.get('/:campaignId', getCampaignHandler)
router.patch('/:campaignId', validateRequest(campaignUpdateSchema), updateCampaignHandler)

router.get('/:campaignId/ads', getCampaignAdsHandler)
router.post('/:campaignId/ads', validateRequest(campaignAdAddSchema), createCampaignAdHandler)
router.patch('/:campaignId/ads/:adId', validateRequest(campaignAdUpdateSchema), updateCampaignAdHandler)
router.patch('/:campaignId/ads/:adId/active', validateRequest(campaignAdActiveSchema), setCampaignAdActiveHandler)

export default router
