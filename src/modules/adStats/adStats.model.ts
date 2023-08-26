import mongoose, { Schema } from 'mongoose'
import { CampaignAd } from '../campaignAd/campaignAd.model'

export interface AdStats extends mongoose.Document {
    adId: CampaignAd | string
    impressions: number
    clicks: number
}

const adStatsSchema = new Schema({
    adId: { type: Schema.Types.ObjectId, ref: 'CampaignAd' },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
}, {
    versionKey: false
})

export const AdStatsModel = mongoose.model<AdStats>(
    'ad_stats',
  adStatsSchema
)
