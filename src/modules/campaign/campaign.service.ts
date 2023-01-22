import { Campaign, CampaignModel } from './campaign.model';
import { campaignRequestBody } from './campaign.schema';
import { CampaignAd, CampaignAdModel, EnumAdLocation } from '../campaignAd/campaignAd.model';
import { Ads, AdsModel } from '../ads/ads.model';

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

export async function syncCampaignAds(
    campaign: Campaign,
    ad: Ads
) {
    return CampaignModel.findByIdAndUpdate(campaign.id, {
        $addToSet: { ads: ad.toObject() }
    })
}

export async function updateCampaignAd(
    ad: Ads,
    location: EnumAdLocation,
    imageName?: string
) {
    const values = {
        location: location
    }

    if (imageName) {
        Object.assign(values, {imageName: imageName})
    }

    //todo: sync
    //await syncCampaignAds(ad.campaign, ad)

    return AdsModel.findByIdAndUpdate(ad.id, values, {new: true})
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
