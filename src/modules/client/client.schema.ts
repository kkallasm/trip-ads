import { object, string, TypeOf } from 'zod'

const params = {
    params: object({
        clientId: string({
            required_error: 'clientId is required',
        }),
    }),
}

const payload = {
    body: object({
        name: string({
            required_error: 'nimi on nõutud',
        }),
    }),
}

export const createClientSchema = object({
    ...payload,
})

export const updateClientSchema = object({
    ...payload,
    ...params,
})

export const deleteClientSchema = object({
    ...params,
})

export type CreateClientInput = TypeOf<typeof createClientSchema>
export type UpdateClientInput = TypeOf<typeof updateClientSchema>
export type DeleteClientInput = TypeOf<typeof deleteClientSchema>
