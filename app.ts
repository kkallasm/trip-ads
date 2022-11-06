import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import adsRouter from './src/modules/campaign/campaign.route'
import clientRouter from './src/modules/client/client.route'
import cors from 'cors'
import helmet from 'helmet'
import { connectToDatabase } from './src/utils/db'
import { StatusCodes } from 'http-status-codes'
import campaignRoute from './src/modules/campaign/campaign.route'
import logger from './src/utils/logger'
import campaignAdRoute from './src/modules/campaignAd/campaignAd.route';

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)
app.use(helmet())

app.get('/', (req: Request, res: Response) => {
    res.send('Trip.ee Ads API')
})

app.use('/api/ads', adsRouter)
app.use('/api/clients', clientRouter)
app.use('/api/campaigns', campaignRoute)
app.use('/api/campaign/:campaignId/ads', campaignAdRoute)

/** Healthcheck */
app.use('/ping', (req: Request, res: Response) =>
    res.status(StatusCodes.OK).json('pong')
)

app.listen(port, async () => {
    await connectToDatabase()
    logger.info(`Server listening at http://localhost:${port}`)
})
