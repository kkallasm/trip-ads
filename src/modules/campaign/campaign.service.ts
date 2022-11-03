import { CampaignModel } from './campaign.model'
import { campaignRequestBody } from './campaign.schema';

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
    values: campaignRequestBody
) {
    return CampaignModel.findByIdAndUpdate(campaignId, values)
}

export function getCampaign(campaignId: string) {
    return CampaignModel.findById(campaignId)
}

export function getCampaigns() {
    return CampaignModel.find().lean()
}
