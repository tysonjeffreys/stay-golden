const Book = require('../models/Books.js')
const path = require('path')
const { title } = require('process')


module.exports = (req, res) => {
    //let author = req.body.title
    //const { author, title } = req.body
    //let title = req.body.title
    //console.log("req.body", req.body)
    //console.log("author:", author)
    //console.log("title:", title)
    //console.log(req.body)
    let image = req.files.image;
    //console.log(image.name)
    //console.log(image)
    image.mv(path.resolve(__dirname,'..','public/img', image.name), async (error) => {
        await Book.create({...req.body, image:'/img/' + image.name})
        
    //,(error, book) => { 
    //    console.log(book)
    //})
    res.redirect('/books')
})
}

