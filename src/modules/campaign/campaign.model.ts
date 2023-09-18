import { Client } from "../client/client.model";
import { AdSelectable, EnumAdLocation, EnumAdLocationType } from "../../types";

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

export type AdSelectableWithStats = AdSelectable & {
    impressions?: number
    clicks?: number
}

export class CampaignAd {
    id: number
    campaignId: number
    imageUrl: string
    locationName: string
    url: string
    active: boolean
    impressions?: number
    clicks?: number
    constructor({ id, campaign_id, image_name, location, active, impressions, clicks }: AdSelectableWithStats) {
        this.id = id
        this.campaignId = campaign_id
        this.imageUrl = process.env.ADS_IMAGE_URL + '/' + image_name
        this.locationName = EnumAdLocation[location as EnumAdLocationType]
        this.url = process.env.APP_URL + '/api/maasikas/' + id + '/c/' + campaign_id + '/click'
        this.active = active
        this.impressions = impressions
        this.clicks = clicks
    }
}

export class Campaign {
    id: number
    name: string
    client: Client
    startDate: string
    endDate: string
    url: string
    ads: CampaignAd[] | []
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

    addAds(ads: AdSelectable[]) {
        this.ads = ads.map(ad => new CampaignAd(ad))
    }
}