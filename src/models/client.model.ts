import mongoose, {Schema} from 'mongoose'

const clientSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    campaigns: [{ type: Schema.Types.ObjectId, ref: 'Campaign' }]
    //createdDate: { type: Date, default: Date.now },
}, {
    timestamps: true,
})

const Client = mongoose.model('Client', clientSchema)
module.exports = Client
