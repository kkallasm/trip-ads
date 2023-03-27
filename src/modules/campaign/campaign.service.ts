import { Campaign, CampaignModel } from './campaign.model';
import { EnumAdLocation } from '../campaignAd/campaignAd.model';
import { Ads, AdsModel } from '../ads/ads.model';

export function createCampaign({
    name,
    client,
    startDate,
    endDate,
    url
}: {
    name: string
    client: string
    startDate: string
    endDate: string
    url: string
}) {
    return CampaignModel.create({ name, client, startDate, endDate, url })
}

export async function updateCampaign(
    campaignId: string,
    values: {
        name: string
        client: string
        startDate: string
        endDate: string
        url: string
}) {
    return CampaignModel.findByIdAndUpdate(campaignId, values, {new: true}).populate('client')
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
    return CampaignModel.find().populate('client').limit(10).sort({'endDate': -1})
}

export async function getCampaignsByClientId(clientId: string) {
    return CampaignModel.find({ client: clientId }).lean()
}

export async function deleteCampaignsByClientId(clientId: string) {
    return CampaignModel.deleteMany({ client: clientId })
}
