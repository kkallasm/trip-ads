import { CampaignModel } from '../campaign/campaign.model';
import { StatsModel } from './ads.model';

export async function getActiveCampaignsByLocation(location: string) {
    return CampaignModel.find({ ads: { $elemMatch: {location: location}} }).lean()
}

export async function addAdImpression(adId: string, campaignId: string, data?: any) {
    return StatsModel.create({ ad: adId, campaign: campaignId, action: 'view', data: data })
}

export async function addAdClick(adId: string, campaignId: string, data?: any) {
    return StatsModel.create({ ad: adId, campaign: campaignId, action: 'click', data: data })
}

export async function getCampaignByAdId(adId: string) {
    return CampaignModel.findOne({ ads: { $elemMatch: {_id: adId}} }).lean()
}
