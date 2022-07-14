import mongoose, {Schema} from 'mongoose'

const campaignAdSchema = new Schema({
    campaign : { type: Schema.Types.ObjectId, ref: 'Campaign' },
    location: String,
    imageName: String,
    //targetUrl: String
})

const CampaignAd = mongoose.model('CampaignAd', campaignAdSchema)
module.exports = CampaignAd