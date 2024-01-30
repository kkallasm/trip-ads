import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'
import { EnumAdLocationType } from './modules/campaignAd/campaignAd.model'

export interface Database {
    campaigns: CampaignsTable
    clients: ClientsTable
    ads: AdsTable
    stats: StatsTable
}

export interface CampaignsTable {
    id: Generated<number>
    name: string
    client_id: number
    start_date: ColumnType<string, string, string>
    end_date: ColumnType<string, string, string>
    url: string
    created_at: ColumnType<string, string | undefined, never>
}

// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
export type CampaignSelectable = Selectable<CampaignsTable>
export type NewCampaign = Insertable<CampaignsTable>
export type CampaignUpdate = Updateable<CampaignsTable>

export interface ClientsTable {
    id: Generated<number>
    name: string
    created_at: ColumnType<Date, string | undefined, never>
}

export type Client = Selectable<ClientsTable>
export type NewClient = Insertable<ClientsTable>
export type ClientUpdate = Updateable<ClientsTable>

export interface AdsTable {
    id: Generated<number>
    campaign_id: number
    image_name: string
    location: EnumAdLocationType
    active: ColumnType<boolean, undefined, boolean | undefined>
    start_date?: string
    end_date?: string
    url?: string
    view_tag_url?: string
}

export type AdSelectable = Selectable<AdsTable>
export type NewAd = Insertable<AdsTable>
export type AdUpdate = Updateable<AdsTable>

export interface StatsTable {
    ad_id: number
    campaign_id: number
    impressions: number
    clicks: number
}
