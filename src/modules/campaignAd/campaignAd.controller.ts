import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    createCampaignAd,
    getAdsByCampaignId,
    updateCampaignAd,
    uploadImageToDOSpaces
} from "./campaignAd.service";
import {
    campaignAdRequestParams,
    campaignAdAddRequestBodyType,
    campaignAdUpdateRequestBodyType
} from "./campaignAd.schema";
import { getCampaign, syncCampaignAds } from "../campaign/campaign.service";
import { getAdById } from "../ads/ads.service";

export async function getCampaignAdsHandler(
  req: Request<campaignAdRequestParams>,
  res: Response,
  next: any
) {
    try {
        const { campaignId } = req.params
        const campaign = await getCampaign(campaignId)
        if (!campaign) {
            return res.status(StatusCodes.NOT_FOUND).send('Campaign not found')
        }

        const ads = await getAdsByCampaignId(campaignId)
        return res.status(StatusCodes.OK).send(ads)
    } catch (e) {
        next(e)
    }
}

export async function createCampaignAdHandler(
  req: Request<campaignAdRequestParams, {}, campaignAdAddRequestBodyType>,
  res: Response
) {
    const { campaignId } = req.params
    const { location, image } = req.body

    console.log(req.params, req.body)

    try {
        const campaign = await getCampaign(campaignId)
        if (!campaign) {
            return res.status(StatusCodes.NOT_FOUND).send('Campaign not found')
        }

        //todo: insert image to spaces
        const imageName = await uploadImageToDOSpaces({ image: image})

        const ad = await createCampaignAd({
            campaign: campaign,
            location: location,
            imageName: imageName,
        })

        await syncCampaignAds(campaign, ad)

        return res.status(StatusCodes.OK).send(ad)
    } catch (e: any) {
        if (e?.code === 11000) {
            return res.status(StatusCodes.CONFLICT).send('Ad with location "' + location + '" already exists')
        } else {
            return res.status(StatusCodes.CONFLICT).send(e?.message)
        }
    }
}

export async function updateCampaignAdHandler(
  req: Request<{ campaignId: string; adId: string }, {}, campaignAdUpdateRequestBodyType>,
  res: Response
) {
    const { campaignId, adId } = req.params
    const { location, image } = req.body

    const ad = await getAdById(adId)
    if (!ad) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    if (ad.campaign.toString() !== campaignId) {
        return res.sendStatus(StatusCodes.FORBIDDEN)
    }

    //todo: update image in spaces
    let imageName = undefined
    if (image) {

    }

    const updated = await updateCampaignAd(ad, location, imageName)
    return res.status(StatusCodes.OK).send(updated)
}
