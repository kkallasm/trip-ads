import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import adRouter from './src/routes/ads'
import cors from 'cors'
import helmet from 'helmet'
import { connectToDatabase } from './src/utils/db'
import { logger } from '@typegoose/typegoose/lib/logSettings'

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

app.use('/ads', adRouter)

app.listen(port, async () => {
    await connectToDatabase()
    logger.info(`Server listening at htp://localhost:${port}`)
})
