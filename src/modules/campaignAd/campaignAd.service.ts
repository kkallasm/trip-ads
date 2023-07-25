import { CampaignAd, CampaignAdModel, EnumAdLocation } from "./campaignAd.model";
import { Campaign } from '../campaign/campaign.model'

export async function getAdsByCampaignId(campaignId: string) {
  return CampaignAdModel.find({ campaign: campaignId }).lean()
}

export function createCampaignAd({
    campaign,
    location,
    imageName,
}: {
    campaign: Campaign
    location: EnumAdLocation
    imageName: string
}) {
    return CampaignAdModel.create({
        campaign,
        location,
        imageName,
    })
}

export async function updateCampaignAd(
  ad: CampaignAd,
  location: EnumAdLocation,
  imageName?: string
) {
    const values = {
        location: location
    }

    if (imageName) {
        Object.assign(values, {imageName: imageName})
    }

    //todo: sync
    //await syncCampaignAds(ad.campaign, ad)

    return CampaignAdModel.findByIdAndUpdate(ad.id, values, {new: true})
}

export async function uploadImageToDOSpaces({ image }: { image: File }) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'ext-access-token': process.env.EXTERNAL_API_ACCESS_TOKEN as string
            }
        }

        const res = await fetch(process.env.TRIP_API_ENDPOINT + '/external/upload-ads-image', options)
        const json = await res.json()
        console.log(json, 'SIIN')

        const imageName = 'asdf.jpg'
        return imageName
    } catch (e: any) {
        throw new Error('URROR DO')
    }
}
