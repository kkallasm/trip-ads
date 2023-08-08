import { object, string, TypeOf, z } from 'zod'
import { EnumAdLocation } from './campaignAd.model'
import { UploadedFile } from 'express-fileupload'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
]

const imageRule = z
    .custom<any>()
    .refine(
        (file: UploadedFile) => {
            return file.size <= MAX_FILE_SIZE
        },
        {
            message: 'Max image size is 500KB.',
        }
    )
    .refine(
        (file: UploadedFile) => ACCEPTED_IMAGE_TYPES.includes(file.mimetype),
        {
            message: 'Only images are allowed to be sent.',
        }
    )

export const campaignAdAddSchema = object({
    params: object({
        campaignId: string(),
    }),
    body: object({
        location: z.nativeEnum(EnumAdLocation, {
            required_error: 'Asukoht puudu',
        }),
    }),
    files: object({
        image: imageRule,
    }),
})

export const campaignAdUpdateSchema = campaignAdAddSchema.extend({
    params: object({
        campaignId: string(),
        adId: string(),
    }),
    files: object({
        image: imageRule.nullable(),
    }),
})

export const campaignAdSchemaParams = object({
    campaignId: string(),
})

export type campaignAdAddRequestType = TypeOf<typeof campaignAdAddSchema>
export type campaignAdUpdateRequestType = TypeOf<typeof campaignAdUpdateSchema>
export type campaignAdRequestParams = TypeOf<typeof campaignAdSchemaParams>
