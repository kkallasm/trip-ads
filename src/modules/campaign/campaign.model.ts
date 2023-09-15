interface Client {
    id: number
    name: string
}

export interface CampaignResponse {
    id: number
    name: string
    client_id: number
    client_name: string
    start_date: string
    end_date: string
    url: string
    created_at: string
}

export class Campaign {
    id: number
    name: string
    client: Client
    startDate: string
    endDate: string
    url: string
    constructor({ id, name, client_id, client_name, start_date, end_date, url }: CampaignResponse) {
        this.id = id
        this.name = name
        this.startDate = start_date
        this.endDate = end_date
        this.url = url
        this.client = {
            id: client_id,
            name: client_name
        }
    }
}