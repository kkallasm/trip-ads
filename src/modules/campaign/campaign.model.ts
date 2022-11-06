import mongoose, { Schema } from 'mongoose'
import { Client, ClientModel } from '../client/client.model';
import { EnumAdLocation, CampaignAd } from '../campaignAd/campaignAd.model'

export interface Campaign extends mongoose.Document {
    name: string
    client: Client | string
    startDate: string
    endDate?: string
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
        startDate: { type: String, required: true  },
        endDate: { type: String, required: false },
        targetUrl: { type: String, required: true, trim: true },
        ads: [{ type: Schema.Types.ObjectId, ref: 'CampaignAd' }],
        locations: [{ type: String, required: false }],
    },
    {
        timestamps: true,
    }
)

campaignSchema.pre('findOneAndUpdate', async function() {
    console.log('Updating')
    const update = {...this.getUpdate()}

    //const user = await ClientModel.findById(update.client)

    //console.log(update)
});

export const CampaignModel = mongoose.model<Campaign>(
    'Campaign',
    campaignSchema
)
