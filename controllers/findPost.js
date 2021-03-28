const BlogPost = require('../models/BlogPost.js')

module.exports = async(req, res) => {
    let search = `${req.query.title}`
    const regex = new RegExp(search, 'i')
    console.log(req.query)
      
    const titleposts = await BlogPost.find({title:{$regex: regex}}, (error, blogspot) => {
        
        console.log(error, blogspot)
    })
    res.render('titlesearch', {
        titleposts
    });    
} 