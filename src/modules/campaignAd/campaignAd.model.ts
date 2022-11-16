import mongoose, {Schema} from 'mongoose'
import { Campaign } from '../campaign/campaign.model'

export enum EnumAdLocation {
    footer = 'footer',
    body = 'body',
    flightOffer = 'flightOffer',
}

export interface CampaignAd extends mongoose.Document {
    campaign: Campaign | string
    location: EnumAdLocation
    imageName: string
}

const campaignAdSchema = new Schema({
    campaign : { type: Schema.Types.ObjectId, ref: 'Campaign', required: true, index: true },
    location: { type: String, required: true, enum: Object.values(EnumAdLocation), index: true },
    imageName: { type: String, required: true },
})

campaignAdSchema.index({campaign: 1, location: 1}, {unique: true})

export const CampaignAdModel = mongoose.model<CampaignAd>('CampaignAd', campaignAdSchema)
