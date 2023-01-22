import { object, string, TypeOf, z } from 'zod'
import { EnumAdLocation } from './ads.model';

export const adSchemaBody = object({
    location: z.nativeEnum(EnumAdLocation, {
        required_error: 'Asukoht puudu'
    }),
    imageName: string({
        required_error: 'Pilt on puudu',
    }),
})

export const adUpdateSchemaBody = adSchemaBody.extend({
    imageName: string({
        required_error: 'Pilt on puudu',
    }).optional()
})

export const adSchemaParams = object({
    campaignId: string(),
})

export type adRequestBody = TypeOf<typeof adSchemaBody>
export type adUpdateRequestBody = TypeOf<typeof adUpdateSchemaBody>
export type adRequestParams = TypeOf<typeof adSchemaParams>