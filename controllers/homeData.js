const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    let perPage = 5
    let page = 1
    /*
    const blogposts = await BlogPost.find({})
    .skip((perPage * page) - perPage)
        .limit(perPage)
        .sort({$natural:1})
*/

    const imageposts = await BlogPost.aggregate([
        { $facet: 
            {
            "totalData": [
                { $match : {} }
            ],
            
            "totalCount": [
                { $count : 'count' }
            ]
            }
        }
    ]) 
    console.log(imageposts[0])
    
        
        /*
        .exec((err, posts) => {
            posts.reverse();
            res.send(posts)
                    
            //callback(err, result)
        })*/
        //.exec(function(err, products) {
        //    Product.count().exec(function(err, count) {
        //        if (err) return next(err)//.populate('userid')
        //console.log(req.session)
        //console.log(blogposts)
        //res.render('index', {
        //    blogposts
                res.send(imageposts)    
    //});
       //     })
        //})
    }
