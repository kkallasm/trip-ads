import {
    CampaignActiveAd,
    EnumAdLocationType,
} from '../campaignAd/campaignAd.model'
import { db } from '../../utils/database'

export async function getActiveAdsByLocation(location: EnumAdLocationType) {
    const today = new Date().toDateString()
    const ads = await db
        .selectFrom('ads')
        .innerJoin('campaigns', 'campaigns.id', 'ads.campaign_id')
        .where('campaigns.start_date', '<=', today)
        .where('campaigns.end_date', '>=', today)
        .where('ads.location', '=', location)
        .where('ads.active', '=', true)
        .where('ads.start_date', '=', today)
        .where('ads.end_date', '=', today)
        .select(['ads.id', 'ads.campaign_id', 'ads.image_name'])
        .execute()

    return ads.map((ad) => {
        return new CampaignActiveAd(ad)
    })
}

export async function getFullscreenMobileAd() {
    const today = new Date().toDateString()
    const ads = await db
        .selectFrom('ads')
        .innerJoin('campaigns', 'campaigns.id', 'ads.campaign_id')
        .where('campaigns.start_date', '<=', today)
        .where('campaigns.end_date', '>=', today)
        .where('ads.location', '=', 'mobile_fullscreen')
        .where('ads.active', '=', true)
        .where('ads.start_date', '<=', today)
        .where('ads.end_date', '>=', today)
        .select(['ads.id', 'ads.campaign_id', 'ads.image_name'])
        .execute()

    return ads.map((ad) => new CampaignActiveAd(ad))
}

export async function addAdImpression(adId: number, campaignId: number) {
    await db
        .insertInto('stats')
        .values({
            ad_id: adId,
            campaign_id: campaignId,
            impressions: 1,
            clicks: 1,
        })
        .onConflict((oc) =>
            oc
                .columns(['ad_id', 'campaign_id'])
                .doUpdateSet({
                    impressions: (eb) => eb('stats.impressions', '+', 1),
                })
                .where('stats.ad_id', '=', adId)
                .where('stats.campaign_id', '=', campaignId)
        )
        .execute()
}

export async function addAdClick(adId: number, campaignId: number) {
    await db
        .insertInto('stats')
        .values({
            ad_id: adId,
            campaign_id: campaignId,
            impressions: 1,
            clicks: 1,
        })
        .onConflict((oc) =>
            oc
                .columns(['ad_id', 'campaign_id'])
                .doUpdateSet({
                    clicks: (eb) => eb('stats.clicks', '+', 1),
                })
                .where('stats.ad_id', '=', adId)
                .where('stats.campaign_id', '=', campaignId)
        )
        .execute()
}

export async function getAdById(adId: number) {
    return await db
        .selectFrom('ads')
        .selectAll()
        .where('id', '=', adId)
        .executeTakeFirstOrThrow()
}
