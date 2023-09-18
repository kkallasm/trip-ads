import { EnumAdLocation } from './campaignAd.model'
import { db } from '../../utils/database'
import { AdSelectable, AdUpdate, NewAd } from '../../types'
import { CampaignAd } from '../campaign/campaign.model'

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
        ])
        .where('ads.campaign_id', '=', campaignId)
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
    location: keyof typeof EnumAdLocation,
    imageName?: string
) {
    const values: AdUpdate = {
        location: location,
    }

    if (imageName) {
        Object.assign(values, { image_name: imageName })
    }

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
