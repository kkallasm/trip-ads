import express from 'express'
import {
    //getCampaignAdHandler,
    //createCampaignAdHandler,
} from './campaignAd.controller'
import { validateRequestBody } from '../../middleware/validateRequest'
import { campaignAdSchemaBody } from './campaignAd.schema'

const router = express.Router()

//router.get('/:campaignId/ads', getCampaignAdsHandler)
//router.post('/', validateRequestBody(campaignAdSchemaBody), createCampaignAdHandler)
//router.get('/:campaignId/ad/:adId', getCampaignAdHandler)

export default router
