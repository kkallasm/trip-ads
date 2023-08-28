import { Database } from '../types'
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import dotenv from 'dotenv'

dotenv.config()

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env
const dialect = new PostgresDialect({
    pool: new Pool({
        host: DB_HOST,
        port: +DB_PORT!,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        ssl: {
            rejectUnauthorized: false,
        },
    }),
})

export const db = new Kysely<Database>({
    dialect,
})
