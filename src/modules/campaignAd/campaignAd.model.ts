import mongoose, {Schema} from 'mongoose'
import { Campaign } from '../campaign/campaign.model'

export enum EnumAdLocation {
    desktop_body = 'DESKTOP 720x120 Sisubänner',
    desktop_flightOffer = 'DESKTOP 720X120 Soodukate päis',
    desktop_sidebar_small = 'DESKTOP 336x240 Väike küljebänner',
    desktop_sidebar_large = 'DESKTOP 336x576 Suur küljebänner',
    mobile_1 = 'MOBIIL Ad 1',
    mobile_2 = 'MOBIIL Ad 2',
    mobile_3 = 'MOBIIL Ad 3',
}

export type EnumAdLocationType = keyof typeof EnumAdLocation

export interface CampaignAd extends mongoose.Document {
    campaignId: string
    location: EnumAdLocationType
    imageName: string
    active: boolean
}

export const campaignAdSchema = new Schema({
    campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true, index: true },
    location: { type: String, required: true, enum: Object.keys(EnumAdLocation), index: true },
    imageName: { type: String, required: true },
    active: { type: Boolean, required: true, default: true, index: true },
}, {
    versionKey: false,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            ret.imageUrl = process.env.ADS_IMAGE_URL + '/' + ret.imageName
            ret.locationName = EnumAdLocation[ret.location as EnumAdLocationType]
            delete ret._id
            delete ret.__v
            return ret
        }
    }
})

campaignAdSchema.index({campaignId: 1, location: 1}, {unique: true})

export const CampaignAdModel = mongoose.model<CampaignAd>('CampaignAd', campaignAdSchema)
