import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { addAdClick, addAdImpression, getActiveCampaignsByLocation, getCampaignByAdId } from './ads.service';

export async function getAdsHandler(
    req: Request<{location: string}>,
    res: Response
) {
    const { location } = req.params
    const ads = await getActiveCampaignsByLocation(location)

    return res.status(StatusCodes.OK).send(ads)
}

export async function adImpressionHandler(
    req: Request<{adId: string}, {}, {campaignId: string, data: any}>,
    res: Response
) {
    try {
        const { adId } = req.params
        const { campaignId, data } = req.body

        await addAdImpression(adId, campaignId, data)
        return res.status(StatusCodes.OK).send('success')
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}

export async function adClickHandler(
    req: Request<{adId: string}, {}, {}>,
    res: Response
) {
    try {
        const { adId } = req.params
        const campaign = await getCampaignByAdId(adId)

        //console.log(campaign, 'CAMP')

        if (campaign) {
            await addAdClick(adId, campaign._id)
            return res.status(StatusCodes.OK).send('success')
        } else return res.sendStatus(StatusCodes.CONFLICT)
    } catch (e: any) {
        return res.status(StatusCodes.CONFLICT).send(e?.message)
    }
}


