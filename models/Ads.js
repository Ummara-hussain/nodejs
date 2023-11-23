const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdsSchema = new Schema({
    title: {
        type: String,
        require: true,
        minlength: 2,
    },
    description: String,
    imageUrl: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        min: 100
    }
})

const Ads = mongoose.model('ads', AdsSchema)

module.exports = Ads