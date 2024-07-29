const mongoose = require('mongoose')

const Comments = new mongoose.Schema({
    userName: String,
    profession: String,
    rating: Number,
    comment: String,
    userId: String,
})

module.exports = new mongoose.model('Comments', Comments)