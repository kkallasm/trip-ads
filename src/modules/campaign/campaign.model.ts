import mongoose, { Schema } from 'mongoose'
import { Client, ClientModel } from '../client/client.model';
import { CampaignAd, campaignAdSchema } from '../campaignAd/campaignAd.model';

export interface Campaign extends mongoose.Document {
    name: string
    client: Client | string
    startDate: Date
    endDate: Date
    url: string
    ads?: CampaignAd[]
    createdAt: Date
    updatedAt: Date
}

export const campaignSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        client: { type: Schema.Types.ObjectId, ref: 'Client' },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        url: { type: String, required: true, trim: true },
        ads: [{ type: campaignAdSchema }]
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
                delete ret.__v
                return ret
            }
        }
    }
)

campaignSchema.pre('save', async function(next) {
    const client = await ClientModel.findById(this.client)
    if (!client) {
        next(new Error('Client not found'))
    }

    next()
})

export const CampaignModel = mongoose.model<Campaign>(
    'Campaign',
    campaignSchema
)
