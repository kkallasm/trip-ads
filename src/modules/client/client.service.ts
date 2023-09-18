import { db } from '../../utils/database'

export async function getAllClients() {
    return await db.selectFrom('clients').selectAll('clients').execute()
}

export async function createClient(name: string) {
    return await db
        .insertInto('clients')
        .values({
            name: name,
        })
        .returningAll()
        .executeTakeFirst()
}

export async function getClient(clientId: number) {
    return await db
        .selectFrom('clients')
        .selectAll('clients')
        .where('id', '=', clientId)
        .executeTakeFirst()
}

export async function updateClient(id: number, name: string) {
    return await db
        .updateTable('clients')
        .set({
            name: name,
        })
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
}

export async function deleteClient(clientId: number) {
    return await db
        .deleteFrom('clients')
        .where('clients.id', '=', clientId)
        .executeTakeFirst()
}
