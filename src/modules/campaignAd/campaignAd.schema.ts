import { object, string, TypeOf, z } from 'zod'
import { EnumAdLocation } from './campaignAd.model'

export const campaignAdSchemaBody = object({
    /*campaign: string({
        required_error: "Kampaania on puudu",
    }),*/
    location: z.nativeEnum(EnumAdLocation, {
        required_error: 'Asukoht puudu'
    }),
    imageName: string({
        required_error: 'Pilt on puudu',
    }),
})

export const campaignAdSchemaParams = object({
    campaignId: string(),
})

export type campaignAdRequestBody = TypeOf<typeof campaignAdSchemaBody>
export type campaignAdUpdateRequestBody = TypeOf<typeof campaignAdSchemaBody>
export type campaignAdRequestParams = TypeOf<typeof campaignAdSchemaParams>