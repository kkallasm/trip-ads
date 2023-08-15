import { CampaignAd, CampaignAdModel, EnumAdLocation, EnumAdLocationType } from "./campaignAd.model";
import { Campaign } from '../campaign/campaign.model'

export async function getAdsByCampaignId(campaignId: string) {
  return CampaignAdModel.find({ campaign: campaignId }).lean()
}

export function createCampaignAd({
    campaignId,
    location,
    imageName,
}: {
    campaignId: string
    location: keyof typeof EnumAdLocation
    imageName: string
}) {
    return CampaignAdModel.create({
        campaignId,
        location,
        imageName,
    })
}

export async function updateCampaignAd(
  ad: CampaignAd,
  location: keyof typeof EnumAdLocation,
  imageName?: string
) {
    const values = {
        locationCode: location
    }

    if (imageName) {
        Object.assign(values, {imageName: imageName})
    }

    //todo: sync
    //await syncCampaignAds(ad.campaign, ad)

    return CampaignAdModel.findByIdAndUpdate(ad.id, values, {new: true})
}
