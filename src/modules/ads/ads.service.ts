import { CampaignModel } from '../campaign/campaign.model';
import { StatsModel } from './ads.model';

export async function getActiveCampaignsByLocation(location: string) {
    return CampaignModel.find({ ads: { $elemMatch: {location: location}} }).lean()
}

export async function addAdImpression(adId: string, campaignId: string, data?: any) {
    return StatsModel.create({ ad: adId, campaign: campaignId, action: 'view', data: data })
}
