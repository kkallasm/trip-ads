import express from 'express'
import {
    getAdsHandler, setAdImpressionHandler
} from './ads.controller';

const router = express.Router()

router.get('/:location', getAdsHandler)
router.post('/:adId', setAdImpressionHandler)

export default router
