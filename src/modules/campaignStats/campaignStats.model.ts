import mongoose, { Schema } from 'mongoose'
import { Campaign } from '../campaign/campaign.model'

export interface CampaignStats extends mongoose.Document {
    campaign: Campaign | string
    ad: number | string
    impressions: number
    clicks: number
}

const campaignStatsSchema = new Schema({
    campaign: { type: Schema.Types.ObjectId, ref: 'Campaign' },
    ad: { type: Schema.Types.ObjectId, ref: 'CampaignAd' },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
})

export const CampaignStatsModel = mongoose.model<CampaignStats>(
    'CampaignStats',
    campaignStatsSchema
)
