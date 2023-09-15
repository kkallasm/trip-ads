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
    .asEnum(["body", "header"])
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
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('ads').execute()
  await db.schema.dropTable('campaigns').execute()
  await db.schema.dropTable('clients').execute()
  await db.schema.dropType('location').execute()
}