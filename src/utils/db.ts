import mongoose from 'mongoose'
import logger from './logger'

export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: 'ads',
        })
        logger.info('Connected to database')
    } catch (e) {
        logger.error(e, 'Failed to connect to database.')
        process.exit(1)
    }
}

export async function disconnectFromDatabase() {
    await mongoose.connection.close()

    logger.info('Disconnect from database')

    return
}
