const BlogPost = require('../models/BlogPost.js')
const path = require('path')


module.exports = (req,res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'..', 'public/img', image.name),    
    async (error) => { 
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name,
            userid: req.session.userId
        })
        console.log('This is the request object from create.ejs ' + req.body.title)
        
        
        let imagePath = path.resolve(__dirname,'..', 'public/img', image.name);
        console.log(imagePath)
        var ExifImage = require('exif').ExifImage;
 
        try {
            new ExifImage({ image : imagePath }, function (error, exifData) {
                if (error)
                    console.log('Error: '+error.message);
                else
                    console.log(exifData); // Do something with your data!
            });
        } catch (error) {
            console.log('Error: ' + error.message);
        }
        
        
        
        
        
        
        
        res.redirect('/')
    })
}

