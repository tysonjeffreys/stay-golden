const Books = require('../models/Books.js')

module.exports = async (req,res) => {
    const books = await Books.find({})
    res.render('books', {books});
}