const { stringify } = require('ini');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema = new Schema({
    title: String,
    author: String,
    username: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String
});

const Book = mongoose.model('Book', BookSchema)

module.exports = Book