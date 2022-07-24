import { date, object, string, TypeOf } from 'zod';

export const campaignSchema = object({
    body: object({
        name: string({
            required_error: "nimi on nõutud",
        }),
        client: string({
            required_error: "klient on puudu",
        }),
        startDate: date({
            required_error: "algus on puudu",
        }),
        endDate: date().optional(),
        targetUrl: string({
            required_error: "link on puudu",
        }),
    }),
    params: object({
        campaignId: string(),
    }),
})

export type CampaignSchema = TypeOf<typeof campaignSchema>