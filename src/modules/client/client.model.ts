import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import mongoose, {Schema} from 'mongoose'
import { ICampaign } from '../campaign/campaign.model';

export interface IClient {
    name: string
    campaigns?: (ICampaign | string)[]
}

const clientSchema = new Schema({
    name: { type: String, required: true, trim: true, unique: true },
    campaigns : [{ type: Schema.Types.ObjectId, ref: 'Campaign' }],
}, {
    timestamps: true
})

export const ClientModel = mongoose.model('Client', clientSchema)

/*export class Client {
    @prop({ required: true, unique: true })
    public name: string

    @prop()
    public campaigns?: Ref<Campaign>[]
}

export const ClientModel = getModelForClass(Client, {
    schemaOptions: {
        timestamps: true,
    },
})*/
