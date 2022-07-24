import { ClientModel } from './client.model'

export function createClient({ name }: { name: string }) {
    return ClientModel.create({ name })
}

export function getClient(clientId: string) {
    return ClientModel.findById(clientId)
}

export function getClients() {
    return ClientModel.find().lean()
}

export function deleteClient(clientId: string) {
    return ClientModel.findByIdAndDelete(clientId)
}
