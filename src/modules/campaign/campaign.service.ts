import { CampaignModel } from './campaign.model'

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

export function updateCampaign(
    campaignId: string,
    { name, client }: { name: string; client: string }
) {
    return CampaignModel.findByIdAndUpdate(campaignId, { name, client })
}

export function getCampaign(campaignId: string) {
    return CampaignModel.findById(campaignId)
}

export function getCampaigns() {
    return CampaignModel.find().lean()
}
