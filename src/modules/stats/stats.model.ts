import mongoose, { Schema } from 'mongoose'
import { CampaignAd } from '../campaignAd/campaignAd.model';
import { Campaign } from '../campaign/campaign.model';

export interface Stats extends mongoose.Document {
    ad: CampaignAd | string
    campaignId: Campaign | string
    action: string
    data: object
    createdAt: Date
}

const statsSchema = new Schema(
    {
        ad: { type: Schema.Types.ObjectId, ref: 'Ads' },
        campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign' },
        action: { type: String, required: true, index: true },
        data: { type: Object, required: false }
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false
    }
)

export const StatsModel = mongoose.model<Stats>(
    'Stats',
    statsSchema
)
