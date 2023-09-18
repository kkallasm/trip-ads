import mongoose, { Schema } from 'mongoose'

export interface AdStats extends mongoose.Document {
    adId: string | number
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
