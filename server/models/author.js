const mongoose = require('mongoose')
const { Schema } = mongoose

const authSchema = new Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('author', authSchema)
