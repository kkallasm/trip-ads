import mongoose, { Schema } from 'mongoose'
import { Campaign } from '../campaign/campaign.model'

export interface Client extends mongoose.Document {
    name: string
    campaigns?: (Campaign | string)[]
    createdAt: Date
    updatedAt: Date
}

const clientSchema = new Schema(
    {
        name: { type: String, required: true, trim: true, unique: true },
        campaigns: [{ type: Schema.Types.ObjectId, ref: 'Campaign' }],
    },
    {
        timestamps: true,
    }
)

export const ClientModel = mongoose.model<Client>('Client', clientSchema)
