import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import mongoose, {Schema} from 'mongoose'
import { ICampaign } from '../campaign/campaign.model';

export enum EnumAdLocation {
    footer = 'footer',
    body = 'body',
    flightOffer = 'flightOffer',
}

export interface ICampaignAd {
    campaign: ICampaign | string
    location: EnumAdLocation
    imageName: string
}

const campaignAdSchema = new Schema({
    campaign : { type: Schema.Types.ObjectId, ref: 'Campaign' },
    location: { enum: Object.values(EnumAdLocation), required: true },
    imageName: { type: String, required: true },
})

const CampaignAdModel = mongoose.model('CampaignAd', campaignAdSchema)
module.exports = CampaignAdModel

/*export enum AdLocation {
    footer = 'footer',
    body = 'body',
    flightOffer = 'flightOffer',
}

export class CampaignAd {
    @prop({ required: true, ref: () => Campaign })
    public owner: Ref<Campaign>

    @prop({ required: true, enum: Object.values(AdLocation) })
    public location: String

    @prop({ required: true })
    public imageName: String
}

export const CampaignAdModel = getModelForClass(CampaignAd, {
    schemaOptions: {
        timestamps: true,
    },
})*/
