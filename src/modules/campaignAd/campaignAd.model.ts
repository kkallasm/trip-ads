import { AdSelectable } from '../../types'

export enum EnumAdLocation {
    desktop_body = 'DESKTOP 720x120 Sisubänner',
    desktop_flight_offers_top = 'DESKTOP 720X120 Soodukate päis',
    desktop_sidebar_small = 'DESKTOP 336x240 Väike küljebänner',
    desktop_sidebar_large = 'DESKTOP 336x576 Suur küljebänner',
    mobile_1 = 'MOBIIL Ad 1',
    mobile_2 = 'MOBIIL Ad 2',
    mobile_3 = 'MOBIIL Ad 3',
    mobile_fullscreen = 'MOBIIL fullscreen',
}

export type EnumAdLocationType = keyof typeof EnumAdLocation

export type AdSelectableWithStats = AdSelectable & {
    impressions?: number
    clicks?: number
}

export class CampaignActiveAd {
    id: number
    campaignId: number
    imageUrl: string
    url: string
    constructor({id, campaign_id, image_name}: {id: number, campaign_id: number, image_name: string}) {
        this.id = id
        this.campaignId = campaign_id
        this.imageUrl = process.env.ADS_IMAGE_URL + '/' + image_name
        this.url = process.env.APP_URL + '/api/maasikas/' + id + '/c/' + campaign_id + '/click'
    }
}

export class CampaignAd {
    id: number
    campaignId: number
    imageUrl: string
    location: string
    locationName: string
    url: string
    active: boolean
    impressions?: number
    clicks?: number
    startDate?: string
    endDate?: string
    constructor({
        id,
        campaign_id,
        image_name,
        location,
        active,
        impressions,
        clicks,
        start_date,
        end_date,
    }: AdSelectableWithStats) {
        this.id = id
        this.campaignId = campaign_id
        this.imageUrl = process.env.ADS_IMAGE_URL + '/' + image_name
        this.location = location
        this.locationName = EnumAdLocation[location as EnumAdLocationType]
        this.url =
            process.env.APP_URL +
            '/api/maasikas/' +
            id +
            '/c/' +
            campaign_id +
            '/click'
        this.active = active
        this.impressions = impressions
        this.clicks = clicks
        this.startDate = start_date
        this.endDate = end_date
    }
}
