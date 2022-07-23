import mongoose, { Schema } from 'mongoose'
import { Client } from '../client/client.model'
import { EnumAdLocation, CampaignAd } from '../campaignAd/campaignAd.model'

export interface Campaign extends mongoose.Document {
    name: string
    client: Client | string
    startDate: Date
    endDate?: Date
    targetUrl: string
    ads?: (CampaignAd | string)[]
    locations?: (EnumAdLocation | string)[]
    createdAt: Date
    updatedAt: Date
}

const campaignSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        client: { type: Schema.Types.ObjectId, ref: 'Client' },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: false },
        targetUrl: { type: String, required: true, trim: true },
        ads: [{ type: Schema.Types.ObjectId, ref: 'CampaignAd' }],
        locations: [{ type: String, required: false }],
    },
    {
        timestamps: true,
    }
)

export const CampaignModel = mongoose.model<Campaign>(
    'Campaign',
    campaignSchema
)
