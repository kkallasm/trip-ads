import { CampaignAdModel, EnumAdLocation } from './campaignAd.model'

export function createCampaignAd({
    campaign,
    location,
    imageName,
}: {
    campaign: string
    location: EnumAdLocation
    imageName: string
}) {
    return CampaignAdModel.create({
        campaign,
        location,
        imageName,
    })
}

export function getCampaignAd(adId: string) {
    return CampaignAdModel.findById(adId)
}

export async function getCampaignAdsByCampaignId(campaignId: string) {
    return CampaignAdModel.find({campaign: campaignId}).lean()
}
