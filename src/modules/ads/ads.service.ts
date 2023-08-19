import { Campaign, CampaignModel } from "../campaign/campaign.model";
import { StatsModel } from '../stats/stats.model'
import { CampaignAd, CampaignAdModel, EnumAdLocationType } from "../campaignAd/campaignAd.model";

export async function getActiveAdsByLocation(location: EnumAdLocationType): Promise<CampaignAd[]> {
    const today = new Date().toDateString()
    const campaigns = await CampaignModel.find({
        startDate: { $lte: today },
        endDate: { $gte: today },
        ads: { $elemMatch: { location: location, active: true } },
    }, { "ads": 1 }).select(["ads"]).lean()

    if (!campaigns) {
        return []
    }

    let ads: CampaignAd[] = []
    campaigns.map((campaign: Campaign) => {
        // @ts-ignore
        ads.push(...campaign.ads?.filter(ad => ad.location === location))
    })

    return ads
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
