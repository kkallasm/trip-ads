import { object, string, TypeOf, z } from 'zod'
import { EnumAdLocation } from './campaignAd.model'

const MAX_FILE_SIZE = 50000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

const imageRule = z
  .custom<File>()
  .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max image size is 500KB.",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only images are allowed to be sent.",
  })

export const campaignAdAddSchemaBody = object({
    location: z.nativeEnum(EnumAdLocation, {
        required_error: 'Asukoht puudu'
    }),
    //image: imageRule,
    image: z
      .custom<File>()
      .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "Max image size is 500KB.",
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message: "Only images are allowed to be sent.",
      })
})

export const campaignAdUpdateSchemaBody = object({
    location: z.nativeEnum(EnumAdLocation, {
        required_error: 'Asukoht puudu'
    }),
    image: imageRule.nullable(),
})

export const campaignAdSchemaParams = object({
    campaignId: string(),
})

export type campaignAdAddRequestBodyType = TypeOf<typeof campaignAdAddSchemaBody>
export type campaignAdUpdateRequestBodyType = TypeOf<typeof campaignAdUpdateSchemaBody>
export type campaignAdRequestParams = TypeOf<typeof campaignAdSchemaParams>