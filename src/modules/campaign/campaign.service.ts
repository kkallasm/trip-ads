import { CampaignModel } from './campaign.model';
import { EnumAdLocation, CampaignAd } from "../campaignAd/campaignAd.model";
import { getAdsByCampaignId } from "../campaignAd/campaignAd.service";

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
  campaignId: string
) {
    const ads = await getAdsByCampaignId(campaignId)
    return CampaignModel.findByIdAndUpdate(campaignId, {
        $set: { ads: ads }
    })
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
