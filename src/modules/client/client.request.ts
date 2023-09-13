import { object, string, TypeOf } from 'zod'

export const clientRequest = object({
    body: object({
        name: string({
            required_error: 'nimi on nõutud',
        }),
    }),
})

export type clientRequest = TypeOf<typeof clientRequest>
