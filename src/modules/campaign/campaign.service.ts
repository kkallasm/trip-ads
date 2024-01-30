import { Campaign, CampaignResponse } from './campaign.model'
import { getAdsByCampaignId } from '../campaignAd/campaignAd.service'
import { db } from '../../utils/database'
import { CampaignSelectable, CampaignUpdate, NewCampaign } from '../../types'

export async function getAllCampaigns(limit: number, offset: number) {
    const query = db
        .selectFrom('campaigns')
        .innerJoin('clients', 'clients.id', 'campaigns.client_id')
        .select([
            'campaigns.id',
            'campaigns.name',
            'campaigns.client_id',
            'clients.name as client_name',
            'campaigns.start_date',
            'campaigns.end_date',
            'campaigns.url',
            'campaigns.created_at',
        ])

    const [campaigns, total] = await Promise.all([
        query.offset(offset).limit(limit).orderBy('campaigns.id desc').execute(),
        query.clearSelect().select(eb => [eb.fn.countAll<number>().as('count')]).executeTakeFirstOrThrow(),
    ])

    const res = await Promise.all(
        campaigns.map(async (campaign: CampaignResponse) => {
            const ads = await getAdsByCampaignId(campaign.id)
            const newCampaign = new Campaign(campaign)
            newCampaign.addAds(ads)
            const clicks = ads.reduce((acc, val) => acc + (val.clicks || 0), 0);
            const impressions = ads.reduce((acc, val) => acc + (val.impressions || 0), 0);
            newCampaign.setImpressions(impressions)
            newCampaign.setClicks(clicks)
            return newCampaign
        }))

    return {
        items: res,
        total: total.count,
    }
}

export async function getCampaign(campaignId: number) {
    const campaign: CampaignResponse = await db
        .selectFrom('campaigns')
        .innerJoin('clients', 'clients.id', 'campaigns.client_id')
        .select([
            'campaigns.id',
            'campaigns.name',
            'campaigns.client_id',
            'clients.name as client_name',
            'campaigns.start_date',
            'campaigns.end_date',
            'campaigns.url',
            'campaigns.created_at',
        ])
        .where('campaigns.id', '=', campaignId)
        .executeTakeFirstOrThrow()

    return new Campaign(campaign)
}

/*export async function getCampaignUrl(campaignId: number) {
    return await db
        .selectFrom('campaigns')
        .select(['url'])
        .where('campaigns.id', '=', campaignId)
        .executeTakeFirstOrThrow()
}*/

export async function createCampaign(values: NewCampaign) {
    const res: CampaignSelectable = await db
        .insertInto('campaigns')
        .values(values)
        .returningAll()
        .executeTakeFirstOrThrow()

    return await getCampaign(res.id)
}

export async function updateCampaign(
    campaignId: number,
    values: CampaignUpdate
) {
    const res = await db
        .updateTable('campaigns')
        .set(values)
        .where('id', '=', campaignId)
        .returningAll()
        .executeTakeFirstOrThrow()

    return await getCampaign(res.id)
}
