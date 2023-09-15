import { CampaignAd, CampaignAdModel, EnumAdLocation } from "./campaignAd.model";

export async function getAdsByCampaignId(campaignId: string) {
  return CampaignAdModel.find({ campaignId: campaignId }).lean()
}

export function createCampaignAd({
    campaignId,
    location,
    imageName,
}: {
    campaignId: string
    location: keyof typeof EnumAdLocation
    imageName: string
}) {
    return CampaignAdModel.create({
        campaignId,
        location,
        imageName,
    })
}

export async function updateCampaignAd(
  ad: CampaignAd,
  location: keyof typeof EnumAdLocation,
  imageName?: string
) {
    const values = {
        locationCode: location
    }

    if (imageName) {
        Object.assign(values, {imageName: imageName})
    }

    return CampaignAdModel.findByIdAndUpdate(ad.id, values, { new: true })
}

export async function setCampaignAdActive(
  ad: CampaignAd,
  active: boolean
) {
    const updatedAd = await CampaignAdModel.findByIdAndUpdate(ad.id, { active: active }, { new: true })
    /*await CampaignModel.updateOne(
      { _id: ad.campaignId, "ads._id": ad.id },
      { $set: { "ads.$.active": active } },
      { new: true }
    )*/

    return updatedAd
}
