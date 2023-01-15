import { CampaignModel } from './campaign.model'
import { campaignRequestBody } from './campaign.schema';
import { CampaignAd, EnumAdLocation } from '../campaignAd/campaignAd.model';

export function createCampaign({
    name,
    client,
    startDate,
    endDate,
    targetUrl
}: {
    name: string
    client: string
    startDate: string
    endDate?: string
    targetUrl: string
}) {
    return CampaignModel.create({ name, client, startDate, endDate, targetUrl })
}

export async function updateCampaign(
    campaignId: string,
    values: campaignRequestBody
) {
    return CampaignModel.findByIdAndUpdate(campaignId, values)
}

export async function updateCampaignLocations(
    campaignId: string,
    location: EnumAdLocation
) {
    return CampaignModel.findByIdAndUpdate(campaignId, {
        $addToSet: { locations: location }
    })
}

export async function updateCampaignAds(
    campaignId: string,
    ad: CampaignAd
) {

    //console.log(JSON.stringify(ad), 'AD SIIN')
    console.log(ad.toObject(), 'AD SIIN2')
    //console.log(ad.toJSON(), 'AD SIIN3')

    return CampaignModel.findByIdAndUpdate(campaignId, {
        $addToSet: { ads: ad.toObject() }
    })
}

export async function getCampaign(campaignId: string) {
    //const campaign = new mongoose.Types.ObjectId(campaignId)
    return CampaignModel.findById(campaignId)
}

export async function getCampaigns() {
    return CampaignModel.find().lean()
}

export async function getCampaignsByClientId(clientId: string) {
    return CampaignModel.find({ client: clientId }).lean()
}

export async function deleteCampaignsByClientId(clientId: string) {
    return CampaignModel.deleteMany({ client: clientId })
}
