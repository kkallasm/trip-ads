import { Client } from '../client/client.model'
import { AdSelectable, CampaignSelectable } from '../../types'
import { CampaignAd } from '../campaignAd/campaignAd.model'

export type CampaignResponse = CampaignSelectable & {
    client_name: string
}

export class Campaign {
    id: number
    name: string
    client: Client
    startDate: string
    endDate: string
    url: string
    impressions?: number
    clicks?: number
    ads: CampaignAd[] | []
    constructor({
        id,
        name,
        client_id,
        client_name,
        start_date,
        end_date,
        url,
    }: CampaignResponse) {
        this.id = id
        this.name = name
        this.startDate = start_date
        this.endDate = end_date
        this.url = url
        this.client = {
            id: client_id,
            name: client_name,
        }
    }

    addAds(ads: AdSelectable[]) {
        this.ads = ads.map((ad) => new CampaignAd(ad))
    }

    setImpressions(value: number) {
        this.impressions = value
    }

    setClicks(value: number) {
        this.clicks = value
    }
}
