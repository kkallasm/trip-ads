import { ClientModel } from './client.model'

export function createClient({ name }: { name: string }) {
    return ClientModel.create({ name })
}

export function getClient(clientId: string) {
    return ClientModel.findOne({ clientId })
}

export function getClients() {
    return ClientModel.find().lean()
}
