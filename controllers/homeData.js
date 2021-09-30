const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    let perPage = 5
    let page = 1
    
    const blogposts = await BlogPost.find({})
    .skip((perPage * page) - perPage)
        .limit(perPage)
        //.exec(function(err, products) {
        //    Product.count().exec(function(err, count) {
        //        if (err) return next(err)//.populate('userid')
        //console.log(req.session)
        //console.log(blogposts)
        //res.render('index', {
        //    blogposts
                res.send(blogposts)    
    //});
       //     })
        //})
    }
