import { ClientModel } from './client.model'

export async function createClient({ name }: { name: string }) {
    return ClientModel.create({ name })
}

export async function getClient(clientId: string) {
    return ClientModel.findById(clientId)
}

export async function getClients() {
    return ClientModel.find().lean()
}

export async function deleteClient(clientId: string) {
    ClientModel.findByIdAndDelete(clientId)
}
