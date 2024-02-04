import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    getOverlappingFullScreenDates,
    createCampaignAd,
    getAdsByCampaignId,
    getFullScreenMobileAdsByCampaignId,
    setCampaignAdActive,
    updateCampaignAd, createStatsTableForAd
} from "./campaignAd.service";
import {
    campaignAdAddRequestType,
    campaignAdActiveRequestType,
    campaignAdUpdateRequestType
} from "./campaignAd.schema";
import { getCampaign } from "../campaign/campaign.service";
import { getAdById } from "../ads/ads.service";
import { UploadedFile } from "express-fileupload";
import { deleteFileFromSpaces, uploadFileToSpaces } from "../../utils/fileUpload";
import { AdSelectable } from "../../types";
import { CampaignAd } from "./campaignAd.model";

export async function getCampaignAdsHandler(
  req: Request<campaignAdAddRequestType["params"]>,
  res: Response,
  next: any
) {
    try {
        const { campaignId } = req.params
        const campaign = await getCampaign(parseInt(campaignId))
        if (!campaign) {
            return res.status(StatusCodes.NOT_FOUND).send('Campaign not found')
        }

        const ads = await getAdsByCampaignId(parseInt(campaignId))
        return res.status(StatusCodes.OK).send(ads)
    } catch (e) {
        next(e)
    }
}

export async function createCampaignAdHandler(
  req: Request<campaignAdAddRequestType["params"], {}, campaignAdAddRequestType["body"]>,
  res: Response
) {
    const { campaignId } = req.params
    const { location, startDate, url, viewTagUrl } = req.body
    const image = req.files?.image as UploadedFile

    try {
        const campaign = await getCampaign(parseInt(campaignId))
        if (!campaign) {
            return res.status(StatusCodes.NOT_FOUND).send('Campaign not found')
        }

        if (location === 'mobile_fullscreen') {
            const adsCount = await getFullScreenMobileAdsByCampaignId(parseInt(campaignId));
            if (adsCount && adsCount.length >= 2) {
                return res.status(StatusCodes.CONFLICT).send({
                    'errors': {
                        'location': [
                            'Can\'t have more than 2 full screen ads per campaign'
                        ]
                    }
                })
            } else {
                const overlappingDates = await getOverlappingFullScreenDates(startDate as string)
                if (overlappingDates && overlappingDates.length > 0) {
                    return res.status(StatusCodes.CONFLICT).send({
                        'errors': {
                            'startDate': [
                                'This date is taken'
                            ]
                        }
                    })
                }
            }
        }

        const fileName = await uploadFileToSpaces(image)
        const ad = await createCampaignAd({
            campaign_id: parseInt(campaignId),
            location: location,
            image_name: fileName,
            start_date: startDate ?? undefined,
            end_date: startDate ?? undefined,
            url: url ?? undefined,
            view_tag_url: viewTagUrl ?? undefined
        })

        await createStatsTableForAd(ad.campaign_id, ad.id)

        return res.status(StatusCodes.OK).send(new CampaignAd(ad))
    } catch (e: any) {
        if (e?.code === '23505') {
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
    const { location, startDate, url, viewTagUrl } = req.body
    const image = req.files?.image as UploadedFile

    try {
        const ad: AdSelectable = await getAdById(parseInt(adId))
        if (!ad) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }

        if (ad.campaign_id.toString() !== campaignId) {
            return res.sendStatus(StatusCodes.FORBIDDEN)
        }

        let values = {
            location: location ?? undefined,
            start_date: startDate ?? undefined,
            end_date: startDate ?? undefined,
            url: url ?? undefined,
            view_tag_url: viewTagUrl ?? undefined
        }

        let imageName = undefined
        if (image) {
            imageName = await uploadFileToSpaces(image)
            Object.assign(values, { image_name: imageName })
            deleteFileFromSpaces(ad.image_name)
        }

        const updated = await updateCampaignAd(ad, values)
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

    const ad = await getAdById(parseInt(adId))
    if (!ad) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    if (ad.campaign_id.toString() !== campaignId) {
        return res.sendStatus(StatusCodes.FORBIDDEN)
    }

    const updated = await setCampaignAdActive(ad, active)
    return res.status(StatusCodes.OK).send(updated)
}