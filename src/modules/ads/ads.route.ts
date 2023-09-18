import express from 'express'
import {
    adImpressionHandler,
    getAdsHandler,
    adClickHandler
} from './ads.controller';

const router = express.Router()

router.get('/:location', getAdsHandler)
router.get('/:adId/c/:campaignId/click', adClickHandler)
router.post('/:adId/c/:campaignId/imp', adImpressionHandler)

export default router
