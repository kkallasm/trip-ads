import { CampaignModel } from './campaign.model'
import { campaignRequestBody } from './campaign.schema';
import mongoose from 'mongoose';
import { EnumAdLocation } from '../campaignAd/campaignAd.model';

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
