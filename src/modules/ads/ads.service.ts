import { Campaign, CampaignModel } from '../campaign/campaign.model'
import { AdsModel } from './ads.model'
import { StatsModel } from '../stats/stats.model'
import { CampaignAdModel, EnumAdLocation } from '../campaignAd/campaignAd.model'

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
        campaign: campaignId,
        action: 'view',
        data: data,
    })
}

export async function addAdClick(adId: string, campaignId: string, data?: any) {
    return StatsModel.create({
        ad: adId,
        campaign: campaignId,
        action: 'click',
        data: data,
    })
}

export function getAdById(adId: string) {
    return AdsModel.findById(adId)
}

export async function getCampaignByAdId(adId: string) {
    return CampaignModel.findOne({ ads: { $elemMatch: { _id: adId } } }).lean()
}

export async function getAdsByCampaignId(campaignId: string) {
    return AdsModel.find({ campaign: campaignId }).lean()
}

export function createAd({
    campaign,
    location,
    imageName,
}: {
    campaign: Campaign
    location: EnumAdLocation
    imageName: string
}) {
    return AdsModel.create({
        campaign,
        location,
        imageName,
    })
}
