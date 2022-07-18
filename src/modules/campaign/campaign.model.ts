import mongoose, { Schema } from 'mongoose'
import { IClient } from '../client/client.model'
import { EnumAdLocation, ICampaignAd } from '../campaignAd/campaignAd.model'

export interface ICampaign {
    name: string
    client: IClient | string
    startDate: Date
    endDate?: Date
    targetUrl: string
    ads?: (ICampaignAd | string)[]
    locations?: (EnumAdLocation | string)[]
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

export const CampaignModel = mongoose.model('Campaign', campaignSchema)

/*export class Campaign {
    @prop({ required: true })
    public name: string

    @prop({ required: true, ref: () => Client })
    public owner: Ref<Client>

    @prop({ index: true, required: true })
    public startDate: Date

    @prop({ index: true })
    public endDate?: Date

    @prop({ required: true })
    public targetUrl: String

    @prop({ ref: () => CampaignAd })
    public ads: Ref<CampaignAd>[]

    @prop({index: true, enum: Object.values(AdLocation)})
    public locations: string[]
}

export const CampaignModel = getModelForClass(Campaign, {
    schemaOptions: {
        timestamps: true,
    },
})*/
