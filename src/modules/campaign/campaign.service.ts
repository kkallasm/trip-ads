import { CampaignModel } from './campaign.model'

export function createCampaign({ client }: { client: string }) {
    return CampaignModel.create({ client })
}

export function getCampaign(campaignId: number) {
    return CampaignModel.findOne({ campaignId })
}

export function getCampaigns() {
    return CampaignModel.find().lean()
}
