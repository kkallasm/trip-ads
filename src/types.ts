import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
  campaigns: CampaignsTable
  clients: ClientsTable
}

export interface CampaignsTable {
  id: Generated<number>
  client_id: number
  start_date: Date
  end_date: Date
  url: string
  created_at: ColumnType<Date, string | undefined, never>
}

// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
export type Campaign = Selectable<CampaignsTable>
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