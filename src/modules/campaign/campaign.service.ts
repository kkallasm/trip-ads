import { Campaign, CampaignResponse } from "./campaign.model";
import { EnumAdLocation } from "../campaignAd/campaignAd.model";
import { getAdsByCampaignId } from "../campaignAd/campaignAd.service";
import { db } from "../../utils/database";
import { CampaignSelectable, CampaignUpdate, NewCampaign } from "../../types";

export async function getAllCampaigns(): Promise<Campaign[]> {
    const campaigns: CampaignResponse[] = await db
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
            'campaigns.created_at'
        ])
        .execute()

    return await Promise.all(campaigns.map(async (campaign: CampaignResponse) => {
        const ads = await getAdsByCampaignId(campaign.id)
        const newCampaign = new Campaign(campaign)
        newCampaign.addAds(ads)
        return newCampaign
    }))
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
            'campaigns.created_at'
        ])
        .where('campaigns.id', '=', campaignId)
        .executeTakeFirstOrThrow()

    return new Campaign(campaign)
}

export async function getCampaignUrl(campaignId: number) {
    return await db
        .selectFrom('campaigns')
        .select(['url'])
        .where('campaigns.id', '=', campaignId)
        .executeTakeFirstOrThrow()
}

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

export async function updateCampaignLocations(
    campaignId: string,
    location: EnumAdLocation
) {
    /*return CampaignModel.findByIdAndUpdate(campaignId, {
        $addToSet: { locations: location }
    })*/

    return true
}

export async function getCampaignsByClientId(clientId: string) {
    return true
    //return CampaignModel.find({ client: clientId }).lean()
}

export async function deleteCampaignsByClientId(clientId: string) {
    return true
    //return CampaignModel.deleteMany({ client: clientId })
}
