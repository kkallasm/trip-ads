import express from 'express'
import {
    adImpressionHandler,
    getAdsHandler,
    adClickHandler
} from './ads.controller';

const router = express.Router()

router.get('/:location', getAdsHandler)
router.get('/:adId/click', adClickHandler)
router.post('/:adId/imp', adImpressionHandler)

export default router
