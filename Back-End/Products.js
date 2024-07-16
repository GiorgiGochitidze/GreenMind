const mongoose = require('mongoose')

const Products = new mongoose.Schema({
    plantsname: String,
    price: Number,
})

module.exports = mongoose.model('Products', Products)