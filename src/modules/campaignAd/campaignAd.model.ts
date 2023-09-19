export enum EnumAdLocation {
    desktop_body = 'DESKTOP 720x120 Sisubänner',
    desktop_flight_offers_top = 'DESKTOP 720X120 Soodukate päis',
    desktop_sidebar_small = 'DESKTOP 336x240 Väike küljebänner',
    desktop_sidebar_large = 'DESKTOP 336x576 Suur küljebänner',
    mobile_1 = 'MOBIIL Ad 1',
    mobile_2 = 'MOBIIL Ad 2',
    mobile_3 = 'MOBIIL Ad 3',
}

export type EnumAdLocationType = keyof typeof EnumAdLocation

export interface activeAdsResponse {
    id: number
    campaign_id: number
    image_name: string
    location: EnumAdLocationType
    active: boolean
    url: string
}

