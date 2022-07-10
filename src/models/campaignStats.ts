import mongoose, {Schema} from 'mongoose'

const campaignStatsSchema = new Schema({
    campaign : { type: Schema.Types.ObjectId, ref: 'Campaign' },
    ad : { type: Schema.Types.ObjectId, ref: 'CampaignAd' },
    impressions: Number,
    clicks: Number,
})

const CampaignStats = mongoose.model('CampaignStats', campaignStatsSchema)
module.exports = CampaignStats