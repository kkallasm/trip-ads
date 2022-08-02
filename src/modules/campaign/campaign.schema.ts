import { object, string, TypeOf } from 'zod';
import logger from '../../utils/logger';

export const campaignSchemaBody = object({
    name: string({
        required_error: "nimi on nõutud",
    }),
    client: string({
        required_error: "klient on puudu",
    }),
    startDate: string({
        required_error: "algus on puudu",
    }).refine((val: string) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (val.match(regex) === null) {
            return false
        }
        const d = new Date(val)
        return !isNaN(d.getTime())
    }, {
        message: 'Invalid date format'
    }),
    endDate: string().optional().refine((val: string|undefined) => {
        if (!val) {
            return true
        }

        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (val.match(regex) === null) {
            return false
        }
        const d = new Date(val)
        return !isNaN(d.getTime())
    }, {
        message: 'Invalid date format'
    }),
    targetUrl: string({
        required_error: "link on puudu",
    }),
})

export const campaignSchemaParams = object({
    campaignId: string(),
})

export const campaignCreateSchema = object({
    body: campaignSchemaBody,
})

export const campaignUpdateSchema = object({
    body: campaignSchemaBody,
    params: campaignSchemaParams
})

export type campaignRequestBody = TypeOf<typeof campaignSchemaBody>
export type campaignRequestParams = TypeOf<typeof campaignSchemaParams>
//export type campaignUpdateInput = TypeOf<typeof campaignUpdateSchema>