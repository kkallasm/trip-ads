import { object, string, TypeOf } from 'zod';

/*export const createClientSchema = {
    body: object({
        name: string({
            required_error: "nimi on nõutud",
        }),
    }),
};*/

export const createClientSchema = object({
    body: object({
        name: string({
            required_error: "nimi on nõutud",
        })
    }),
});

export type CreateClientBody = TypeOf<typeof createClientSchema>