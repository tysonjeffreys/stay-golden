const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    let perPage = 5
    let page = parseInt(req.params.page) || 1
    console.log(page)
    

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
    console.log(imageposts[0])
    
        
       
                res.send(imageposts)    
    
    }
