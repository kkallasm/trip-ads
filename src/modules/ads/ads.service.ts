import { CampaignModel } from '../campaign/campaign.model'
import { StatsModel } from '../stats/stats.model'
import { CampaignAdModel } from "../campaignAd/campaignAd.model";

export async function getActiveCampaignsByLocation(location: string) {
    return CampaignModel.find({
        ads: { $elemMatch: { location: location } },
    }).lean()
}

export async function addAdImpression(
    adId: string,
    campaignId: string,
    data?: any
) {
    return StatsModel.create({
        ad: adId,
        campaignId: campaignId,
        action: 'view',
        data: data,
    })
}

export async function addAdClick(adId: string, campaignId: string, data?: any) {
    return StatsModel.create({
        ad: adId,
        campaignId: campaignId,
        action: 'click',
        data: data,
    })
}

export function getAdById(adId: string) {
    return CampaignAdModel.findById(adId)
}

export async function getCampaignByAdId(adId: string) {
    return CampaignModel.findOne({ ads: { $elemMatch: { _id: adId } } }).lean()
}
