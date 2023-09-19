import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('clients')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addUniqueConstraint('client_name_unique', ['name'])
    .execute()

  await db.schema
    .createTable('campaigns')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('client_id', 'integer', (col) => col.references('clients.id').onDelete('cascade').notNull())
    .addColumn('start_date', 'timestamp', (col) =>
      col.notNull()
    )
    .addColumn('end_date', 'timestamp', (col) =>
      col.notNull()
    )
    .addColumn('url', 'varchar', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute()

  await db.schema
    .createIndex('campaigns_client_id_index')
    .on('campaigns')
    .column('client_id')
    .execute()

  await db.schema
    .createIndex('campaigns_start_date_index')
    .on('campaigns')
    .column('start_date')
    .execute()

  await db.schema
    .createIndex('campaigns_end_date_index')
    .on('campaigns')
    .column('end_date')
    .execute()

  await db.schema
    .createType("location")
    .asEnum(["desktop_body", "desktop_flight_offers_top", "desktop_sidebar_small", "desktop_sidebar_large", "mobile_1", "mobile_2", "mobile_3"])
    .execute();

  await db.schema
    .createTable('ads')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('campaign_id', 'integer', (col) =>
      col.references('campaigns.id').onDelete('cascade').notNull()
    )
    .addColumn('image_name', 'varchar', (col) => col.notNull())
    .addColumn('location', sql`location`, (col) => col.notNull())
    //.addColumn('location', 'varchar', (col) => col.notNull())
    .addColumn('active', 'boolean', (col) => col.notNull().defaultTo(true))
    .addUniqueConstraint('ads_campaign_location_unique', ['campaign_id', 'location'])
    .execute()

  await db.schema
    .createIndex('ads_campaign_id_index')
    .on('ads')
    .column('campaign_id')
    .execute()

  await db.schema
      .createIndex('ads_location_index')
      .on('ads')
      .column('location')
      .execute()

  await db.schema
      .createIndex('ads_active_index')
      .on('ads')
      .column('active')
      .execute()

  await db.schema
      .createTable('stats')
      .addColumn('ad_id', 'integer', (col) =>
          col.references('ads.id').onDelete('cascade').notNull()
      )
      .addColumn('campaign_id', 'integer', (col) =>
          col.references('campaigns.id').onDelete('cascade').notNull()
      )
      .addColumn('impressions', 'integer', (col) => col.notNull())
      .addColumn('clicks', 'integer', (col) => col.notNull())
      .addUniqueConstraint('stats_ad_campaign_unique', ['ad_id', 'campaign_id'])
      .execute()

  await db.schema
      .createIndex('stats_ad_id_index')
      .on('stats')
      .column('ad_id')
      .execute()

  await db.schema
      .createIndex('stats_campaign_id_index')
      .on('stats')
      .column('campaign_id')
      .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('stats').execute()
  await db.schema.dropTable('ads').execute()
  await db.schema.dropTable('campaigns').execute()
  await db.schema.dropTable('clients').execute()
  await db.schema.dropType('location').execute()
}