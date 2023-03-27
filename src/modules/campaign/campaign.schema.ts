import { object, string, TypeOf } from 'zod'

const checkValidDates = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return start <= end
}

export const campaignSchemaBody = object({
    name: string({
        required_error: "Nimi on nõutud",
    }),
    clientId: string({
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
    endDate: string().refine((val: string) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (val.match(regex) === null) {
            return false
        }
        const d = new Date(val)
        return !isNaN(d.getTime())
    }, {
        message: 'Vale kuupäeva formaat (YYYY-mm-dd)',
    }),
    url: string({
        required_error: 'Link on puudu',
    }).url('Link ei ole url'),
}).refine((data) => checkValidDates(data.startDate, data.endDate), {
    message: 'Alguskuupäev peab olema väiksem kui lõpp.',
    path: ['startDate'],
})

export const campaignSchemaParams = object({
    campaignId: string(),
})

/*export const campaignCreateSchema = object({
    body: campaignSchemaBody,
})*/

/*export const campaignUpdateSchema = object({
    body: campaignSchemaBody,
    params: campaignSchemaParams
})*/

export type campaignRequestBody = TypeOf<typeof campaignSchemaBody>
export type campaignRequestParams = TypeOf<typeof campaignSchemaParams>