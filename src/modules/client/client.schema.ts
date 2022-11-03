import { object, string, TypeOf } from 'zod'

export const clientSchema = object({
    name: string({
        required_error: 'nimi on nõutud',
    }),
})

export type ClientInput = TypeOf<typeof clientSchema>
