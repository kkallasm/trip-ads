import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import adsRouter from './modules/ads/ads.route'
import clientRouter from './modules/client/client.route'
import cors from 'cors'
import helmet from 'helmet'
import { StatusCodes } from 'http-status-codes'
import campaignRoute from './modules/campaign/campaign.route'
import logger from './utils/logger'
import fileUpload from 'express-fileupload'
import cookieParser from "cookie-parser"

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())
app.use(express.static('public'))

app.use(cors({credentials: true, origin: process.env.CORS_ORIGIN_URL}))

app.use(fileUpload({
    limits: {
        fileSize: 1024 * 150 // 150Kb
    },
    abortOnLimit: true
}))

//todo: compression ?

app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
    res.send('Trip.ee Ads API')
})

app.use('/api/maasikas', adsRouter)
app.use('/api/clients', clientRouter)
app.use('/api/campaigns', campaignRoute)

/** Healthcheck */
app.use('/ping', (req: Request, res: Response) =>
    res.status(StatusCodes.OK).json('pong')
)

app.use(function (req, res, next) {
    return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: 'Route not found',
    })
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 500,
        message: error?.message,
    })
})

app.listen(port, async () => {
    //await connectToDatabase()
    logger.info(`Server listening at http://localhost:${port}`)
})
