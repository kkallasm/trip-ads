import * as path from 'path'
import { promises as fs } from 'fs'
import {
  Migrator,
  FileMigrationProvider,
} from 'kysely'
import { db } from "../utils/database";

async function migrateOneDown() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '../migrations'),
    }),
  })

  const { error, results } = await migrator.migrateDown()
  if (error) {
    console.error('failed to migrate DOWN')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

void migrateOneDown();