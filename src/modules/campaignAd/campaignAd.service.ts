import { CampaignAd } from "./campaignAd.model";
import { db } from '../../utils/database'
import { AdSelectable, AdUpdate, NewAd } from '../../types'

export async function getAdsByCampaignId(campaignId: number) {
    return await db
        .selectFrom('ads')
        .leftJoin('stats', 'stats.ad_id', 'ads.id')
        .select([
            'ads.id',
            'ads.campaign_id',
            'ads.location',
            'ads.active',
            'ads.image_name',
            'stats.clicks',
            'stats.impressions',
            'ads.start_date',
            'ads.end_date',
        ])
        .where('ads.campaign_id', '=', campaignId)
        .orderBy('ads.location', 'asc')
        .execute()
}

export async function getFullScreenMobileAdsByCampaignId(campaignId: number) {
    return await db
        .selectFrom('ads')
        .select([
            'ads.id'
        ])
        .where('ads.campaign_id', '=', campaignId)
        .where('ads.location', '=', 'mobile_fullscreen')
        .execute()
}

export async function createCampaignAd(values: NewAd) {
    return await db
        .insertInto('ads')
        .values(values)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function updateCampaignAd(
    ad: AdSelectable,
    values: AdUpdate
) {
    /*const values: AdUpdate = {}
    if (location) {
        Object.assign(values, { location: location })
    }

    if (imageName) {
        Object.assign(values, { image_name: imageName })
    }

    if (startDate) {
        Object.assign(values, { start_date: startDate })
        Object.assign(values, { end_date: startDate })
    }*/

    const res = await db
        .updateTable('ads')
        .set(values)
        .where('id', '=', ad.id)
        .returningAll()
        .executeTakeFirstOrThrow()

    return new CampaignAd(res)
}

export async function setCampaignAdActive(ad: AdSelectable, active: boolean) {
    const values: AdUpdate = {
        active: active,
    }
    const res = await db
        .updateTable('ads')
        .set(values)
        .where('id', '=', ad.id)
        .returningAll()
        .executeTakeFirstOrThrow()

    return new CampaignAd(res)
}

export async function getOverlappingFullScreenDates(date: string) {
    return await db
        .selectFrom('ads')
        .select([
            'ads.id'
        ])
        .where('ads.location', '=', 'mobile_fullscreen')
        .where('ads.start_date', '=', date)
        .execute()
}
