//Code for retrieving data from MongoDB utilizing the aggregate method.

const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    let perPage = 20
    let page = parseInt(req.params.page) || 1
    
    const imageposts = await BlogPost.aggregate([
        { $facet: 
            {
            "totalData": [
                { $match : {} },
                { $sort : { _id : -1 } },
                { $skip : (perPage * page) - perPage },
                { $limit : perPage },
            ],
            
            "totalCount": [
                { $count : 'count' }
            ]
            }
        }
    ]) 
    
    res.send(imageposts)    
    
}
