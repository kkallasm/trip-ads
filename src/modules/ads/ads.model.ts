import mongoose, { Schema } from 'mongoose'
import { Campaign } from '../campaign/campaign.model';

export enum EnumAdLocation {
    footer = 'footer',
    body = 'body',
    flightOffer = 'flightOffer',
}

export interface Ads extends mongoose.Document {
    campaign: Campaign | string
    location: EnumAdLocation
    imageName: string
}

export const adsSchema = new Schema({
    campaign : { type: Schema.Types.ObjectId, ref: 'Campaign', required: true, index: true },
    location: { type: String, required: true, enum: Object.values(EnumAdLocation), index: true },
    imageName: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
}, {
    versionKey: false
})

adsSchema.index({campaign: 1, location: 1}, {unique: true})

export const AdsModel = mongoose.model<Ads>('Ads', adsSchema)
