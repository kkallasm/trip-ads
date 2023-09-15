import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    createCampaignAd,
    getAdsByCampaignId,
    setCampaignAdActive,
    updateCampaignAd
} from "./campaignAd.service";
import {
    campaignAdAddRequestType,
    campaignAdActiveRequestType,
    campaignAdUpdateRequestType
} from "./campaignAd.schema";
import { getCampaign, syncCampaignAds } from "../campaign/campaign.service";
import { getAdById } from "../ads/ads.service";
import { UploadedFile } from "express-fileupload";
import { uploadFileToSpaces } from "../../utils/fileUpload";

export async function getCampaignAdsHandler(
  req: Request<campaignAdAddRequestType["params"]>,
  res: Response,
  next: any
) {
    try {
        /*const { campaignId } = req.params
        const campaign = await getCampaign(campaignId)
        if (!campaign) {
            return res.status(StatusCodes.NOT_FOUND).send('Campaign not found')
        }

        const ads = await getAdsByCampaignId(campaignId)
        return res.status(StatusCodes.OK).send(ads)*/

        return res.status(StatusCodes.OK).send('jah')
    } catch (e) {
        next(e)
    }
}

export async function createCampaignAdHandler(
  req: Request<campaignAdAddRequestType["params"], {}, campaignAdAddRequestType["body"]>,
  res: Response
) {
    const { campaignId } = req.params
    const { location } = req.body
    const image = req.files?.image as UploadedFile

    try {
       /* const campaign = await getCampaign(campaignId)
        if (!campaign) {
            return res.status(StatusCodes.NOT_FOUND).send('Campaign not found')
        }

        const fileName = await uploadFileToSpaces(image)

        const ad = await createCampaignAd({
            campaignId: campaignId,
            location: location,
            imageName: fileName,
        })

        await syncCampaignAds(campaignId)

        return res.status(StatusCodes.OK).send(ad)*/

        return res.status(StatusCodes.OK).send('ok')
    } catch (e: any) {
        if (e?.code === 11000) {
            return res.status(StatusCodes.CONFLICT).send({
                'errors': {
                    'location': [
                        'Ad with location "' + location + '" already exists'
                    ]
                }
            })
        } else {
            return res.status(StatusCodes.CONFLICT).send(e?.message)
        }
    }
}

export async function updateCampaignAdHandler(
  req: Request<campaignAdUpdateRequestType["params"], {}, campaignAdUpdateRequestType["body"]>,
  res: Response
) {
    const { campaignId, adId } = req.params
    const { location } = req.body

    try {
        const ad = await getAdById(adId)
        if (!ad) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }

        if (ad.campaignId.toString() !== campaignId) {
            return res.sendStatus(StatusCodes.FORBIDDEN)
        }

        //todo: update image in spaces
        let imageName = undefined
        /*if (image) {

        }*/

        const updated = await updateCampaignAd(ad, location, imageName)

        await syncCampaignAds(ad.campaignId)

        return res.status(StatusCodes.OK).send(updated)
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}

export async function setCampaignAdActiveHandler(
  req: Request<campaignAdActiveRequestType["params"], {}, campaignAdActiveRequestType["body"]>,
  res: Response
) {
    const { campaignId, adId } = req.params
    const { active } = req.body

    const ad = await getAdById(adId)
    if (!ad) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    if (ad.campaignId.toString() !== campaignId) {
        return res.sendStatus(StatusCodes.FORBIDDEN)
    }

    const updated = await setCampaignAdActive(ad, active)

    return res.status(StatusCodes.OK).send(updated)
}