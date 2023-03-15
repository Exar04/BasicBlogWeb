const mongoose = require('mongoose')
const schema = mongoose.schema

const blogSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    snippet : {
        type: String,
        required: true
    },
    body : {
        type: String,
        required: true
    }

}, { timestamps: true})

const Blog = mongoose.model('Blogs', blogSchema)
module.exports = Blog