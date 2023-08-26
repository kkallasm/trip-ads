import { Campaign, CampaignModel } from "../campaign/campaign.model";
import { StatsModel } from '../stats/stats.model'
import { CampaignAd, CampaignAdModel, EnumAdLocationType } from "../campaignAd/campaignAd.model";
import { AdStatsModel } from "../adStats/adStats.model";

export type CampaignAdWithUrl = CampaignAd & {
    url: string
}

export async function getActiveAdsByLocation(location: EnumAdLocationType): Promise<CampaignAdWithUrl[]> {
    const today = new Date().toDateString()
    const campaigns = await CampaignModel.find({
        startDate: { $lte: today },
        endDate: { $gte: today },
        ads: { $elemMatch: { location: location, active: true } },
    }, { "ads": 1 }).select(['ads', 'url'])

    if (!campaigns) {
        return []
    }

    let ads: CampaignAdWithUrl[] = []
    campaigns.map((campaign: Campaign) => {
        const filtered = campaign.ads?.filter(ad => ad.location === location)
        if (filtered) {
            const res: CampaignAdWithUrl[] = filtered?.map(f => {
                return {...f.toJSON(), url: process.env.APP_URL + '/api/maasikas/' + f._id + '/click'}
            })
            ads.push(...res)
        }
    })

    return ads
}

export async function addAdImpressionOLD(
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

export async function addAdImpression(
  adId: string
) {
    return AdStatsModel.updateOne(
      { adId: adId },
      { $inc: { impressions: +1 } },
      { upsert: true }
    )
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
