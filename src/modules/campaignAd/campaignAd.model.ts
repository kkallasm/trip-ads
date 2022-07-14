import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { Campaign } from '../campaign/campaign.model'

/**
 * const campaignAdSchema = new Schema({
 *     campaign : { type: Schema.Types.ObjectId, ref: 'Campaign' },
 *     location: String,
 *     imageName: String,
 *     //targetUrl: String
 * })
 */

export enum AdLocation {
    footer = 'footer',
    body = 'body',
    flightoffer = 'flightoffer',
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
})
