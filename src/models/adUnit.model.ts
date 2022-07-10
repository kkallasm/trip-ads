import mongoose, {Schema} from 'mongoose'

const adUnitSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    width: Number,
    height: Number,
    description: String,
})

const AdUnit = mongoose.model('AdUnit', adUnitSchema)
module.exports = AdUnit