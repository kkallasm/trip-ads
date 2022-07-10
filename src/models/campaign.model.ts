import mongoose, {Schema} from 'mongoose'

const adSchema = new Schema({
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
})

const Campaign = mongoose.model('Campaign', campaignSchema)
module.exports = Campaign