import { getModelForClass, prop } from '@typegoose/typegoose';
import { Campaign } from '../campaign/campaign.model';

/*const clientSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    campaigns: [{ type: Schema.Types.ObjectId, ref: 'Campaign' }]
    //createdDate: { type: Date, default: Date.now },
}, {
    timestamps: true,
})

const Client = mongoose.model('Client', clientSchema)
module.exports = Client*/


export class Client {
    @prop({ required: true, unique: true })
    public name: string

    @prop({ required: false })
    public campaigns: Array<Campaign>
}

export const ClientModel = getModelForClass(Client, {
    schemaOptions: {
        timestamps: true,
    },
})