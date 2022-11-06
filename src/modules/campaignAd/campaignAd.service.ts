import { CampaignAdModel } from './campaignAd.model'

export function createCampaignAd({
    name,
    client,
    startDate,
    endDate,
    targetUrl,
}: {
    name: string
    client: string
    startDate: string
    endDate?: string
    targetUrl: string
}) {
    return CampaignAdModel.create({
        name,
        client,
        startDate,
        endDate,
        targetUrl,
    })
}

export function getCampaignAd(campaignId: string) {
    return CampaignAdModel.findById(campaignId)
}

export function getCampaignAds() {
    return CampaignAdModel.find().lean()
}
