import express from 'express'
import {
    getCampaignAdsHandler,
    getCampaignAdHandler,
    createCampaignAdHandler,
} from './campaignAd.controller'
import { validateRequestBody } from '../../middleware/validateRequest'
import { campaignAdSchemaBody } from './campaignAd.schema'

const router = express.Router()

router.get('/', getCampaignAdsHandler)
router.post('/', validateRequestBody(campaignAdSchemaBody), createCampaignAdHandler)
router.get('/:campaignAdId', getCampaignAdHandler)

export default router
