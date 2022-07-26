import mongoose, { CallbackError, CallbackWithoutResultAndOptionalError, Schema } from 'mongoose';
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

/*campaignSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    const self = this
    CampaignModel.find({name : self.name}, function (err: CallbackError, docs: any) {
        if (!docs.length) {
            next();
        } else {
            console.log('user exists: ', self.name);
            next(new Error("User exists!"));
        }
    });
})*/

export const CampaignModel = mongoose.model<Campaign>(
    'Campaign',
    campaignSchema
)
