import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
    createCampaign,
    getCampaigns,
    getCampaign,
    updateCampaign,
    syncCampaignAds,
    updateCampaignAd
} from './campaign.service';
import { campaignRequestParams, campaignRequestBody } from './campaign.schema';
import { adRequestBody, adRequestParams, adUpdateRequestBody } from '../ads/ad.schema';
import { createAd, getAdsByCampaignId, getAdById } from '../ads/ads.service';
import {getClients} from "../client/client.service";

export async function getCampaignsHandler(req: Request, res: Response) {
    const campaigns = await getCampaigns()
    const clients = await getClients()
    return res.status(StatusCodes.OK).send({
        campaigns: campaigns,
        clients: clients
    })
}

export async function getCampaignHandler(
    req: Request<campaignRequestParams>,
    res: Response
) {
    const { campaignId } = req.params
    const campaign = await getCampaign(campaignId)
    if (!campaign) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    return res.status(StatusCodes.OK).send(campaign)
}

export async function createCampaignHandler(
    req: Request<{}, {}, campaignRequestBody>,
    res: Response
) {
    try {
        const { name, clientId, startDate, endDate, url } = req.body
        let campaign = await createCampaign({
            name: name,
            client: clientId,
            startDate: startDate,
            endDate: endDate,
            url: url
        })

        campaign = await campaign.populate('client', {name})

        return res.status(StatusCodes.OK).send(campaign)

    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}

export async function updateCampaignHandler(
    req: Request<campaignRequestParams, {}, campaignRequestBody>,
    res: Response
) {
    const { campaignId } = req.params
    const { name, clientId, startDate, endDate, url } = req.body
    try {
        const campaign = await updateCampaign(campaignId, {
            name: name,
            client: clientId,
            startDate: startDate,
            endDate: endDate,
            url: url
        })

        if (!campaign) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }

        return res.status(StatusCodes.OK).send(campaign)
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}

export async function getCampaignAdsHandler(
    req: Request<adRequestParams>,
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
    req: Request<adRequestParams, {}, adRequestBody>,
    res: Response
) {
    const { campaignId } = req.params
    const { location, imageName } = req.body

    try {
        const campaign = await getCampaign(campaignId)
        if (!campaign) {
            return res.status(StatusCodes.NOT_FOUND).send('Campaign not found')
        }

        const ad = await createAd({
            campaignId: campaign,
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
    req: Request<{ campaignId: string; adId: string }, {}, adUpdateRequestBody>,
    res: Response
) {
    const { campaignId, adId } = req.params
    const { location, imageName } = req.body

    const ad = await getAdById(adId)
    if (!ad) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    if (ad.campaign.toString() !== campaignId) {
        return res.sendStatus(StatusCodes.FORBIDDEN)
    }

    const updated = await updateCampaignAd(ad, location, imageName)

    return res.status(StatusCodes.OK).send(updated)
}
