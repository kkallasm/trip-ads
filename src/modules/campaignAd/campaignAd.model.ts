import mongoose, {Schema} from 'mongoose'
import { Campaign } from '../campaign/campaign.model';

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
    campaign : { type: Schema.Types.ObjectId, ref: 'Campaign' },
    location: { enum: Object.values(EnumAdLocation) },
    imageName: { type: String, required: true },
})

export const CampaignAdModel = mongoose.model<CampaignAd>('CampaignAd', campaignAdSchema)
