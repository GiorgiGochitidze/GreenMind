const mongoose = require('mongoose')

const Products = new mongoose.Schema({
    imgUrl: String,
    plantsname: String,
    price: Number,
    cloudinaryId: { type: String },
    purchashes: Number,
})

module.exports = mongoose.model('Products', Products)