import { object, string, TypeOf } from 'zod'

export const campaignAdSchemaBody = object({
    name: string({
        required_error: "Nimi on nõutud",
    }),
    client: string({
        required_error: "Klient on puudu",
    }),
    startDate: string({
        required_error: "Alguskuupäev on puudu",
    }).refine((val: string) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (val.match(regex) === null) {
            return false
        }
        const d = new Date(val)
        return !isNaN(d.getTime())
    }, {
        message: 'Vale kuupäeva formaat (YYYY-mm-dd)'
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
        message: 'Vale kuupäeva formaat (YYYY-mm-dd)',
    }),
    targetUrl: string({
        required_error: 'Link on puudu',
    }).url('Link ei ole url'),
})

export const campaignAdSchemaParams = object({
    campaignId: string(),
})

export type campaignAdRequestBody = TypeOf<typeof campaignAdSchemaBody>
export type campaignAdRequestParams = TypeOf<typeof campaignAdSchemaParams>