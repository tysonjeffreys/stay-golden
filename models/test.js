const mongoose = require('mongoose')
 
const BlogPost = require('../models/BlogPost')

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true});

/*BlogPost.create({
    title: 'The Mythbuster\'s Guide to Saving Money on Enerygy Bills',
    body: 'If you have been here along time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills.'
}, (error, blogpost) => {
    console.log(error, blogpost)
})
*/

BlogPost.create({
    title: 'hello',
    body: 'hyperion'
}, (error, blogpost) => {
    console.log(error, blogpost)
})

BlogPost.find({}, (error, blogspot) => {
    console.log(error, blogspot)
})

let id = '5fb97cfecaacbc65bb876a82';

BlogPost.findById(id, (error, blog) => {
    console.log(error, blog)
})