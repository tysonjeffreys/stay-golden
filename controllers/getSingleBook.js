const Books = require('../models/Books.js')

module.exports = async(req,res) => {
    const { author, title } = req.body
    //console.log(author)
    //console.log(title)
    console.log(req)
    const book = await Books.findById(req.params.id)
    res.render('book', {book})
}