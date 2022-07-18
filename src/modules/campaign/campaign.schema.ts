import { date, object, string, TypeOf } from 'zod';

export const registerCampaignSchema = {
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
};

export type RegisterCampaignBody = TypeOf<typeof registerCampaignSchema.body>
export type RegisterCampaignParams = TypeOf<typeof registerCampaignSchema.params>