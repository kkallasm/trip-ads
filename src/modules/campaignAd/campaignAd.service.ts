import { CampaignAd, CampaignAdModel, EnumAdLocation } from "./campaignAd.model";
import { Campaign } from '../campaign/campaign.model'
import { UploadedFile } from "express-fileupload";

export async function getAdsByCampaignId(campaignId: string) {
  return CampaignAdModel.find({ campaign: campaignId }).lean()
}

export function createCampaignAd({
    campaign,
    location,
    imageName,
}: {
    campaign: Campaign
    location: EnumAdLocation
    imageName: string
}) {
    return CampaignAdModel.create({
        campaign,
        location,
        imageName,
    })
}

export async function updateCampaignAd(
  ad: CampaignAd,
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

    return CampaignAdModel.findByIdAndUpdate(ad.id, values, {new: true})
}
