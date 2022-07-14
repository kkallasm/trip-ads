import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { Client } from '../client/client.model'
import { AdLocation, CampaignAd } from '../campaignAd/campaignAd.model';

/*const adSchema = new Schema({
    adUnit: { type: Schema.Types.ObjectId, ref: 'CampaignAd' },
    location: String
})

const campaignSchema = new Schema({
    name: { type: String, required: true, trim: true },
    client : { type: Schema.Types.ObjectId, ref: 'Client' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    //ads : [{ type: Schema.Types.ObjectId, ref: 'CampaignAd' }],
    //ads : [{ type: adSchema, required: true }],
    ads: [{ adId: Number, location: String }],
}, {
    timestamps: true,
})*/

//const Campaign = mongoose.model('Campaign', campaignSchema)
//module.exports = Campaign

export class Campaign {
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
})
