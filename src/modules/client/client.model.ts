import mongoose, { CallbackWithoutResultAndOptionalError, Schema } from 'mongoose'
import { Campaign } from '../campaign/campaign.model'
import { MongoServerError } from 'mongodb'

export interface Client extends mongoose.Document {
    name: string
    //campaigns?: (Campaign | string)[]
    createdAt: Date
    updatedAt: Date
}

const clientSchema = new Schema(
    {
        name: { type: String, required: true, trim: true, unique: true },
        //campaigns: [{ type: Schema.Types.ObjectId, ref: 'Campaign' }],
    },
    {
        timestamps: true,
        versionKey: false
    }
)

/*clientSchema.post('save', function(error: NativeError, doc: any, next: CallbackWithoutResultAndOptionalError) {
    if (error instanceof MongoServerError && error.code === 11000) {
        const validationError = this.invalidate(
            'name',
            'Dubleeritud',
            'asdf',
            'kind'
        );
        next(validationError)
    } else {
        next()
    }
})*/

export const ClientModel = mongoose.model<Client>('Client', clientSchema)
