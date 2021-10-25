require('dotenv').config();
const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const aws = require('aws-sdk');

aws.config.region = 'us-east-1';

//controllers
const homeController = require('./controllers/home')
const homeDataController = require('./controllers/homeData')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const flash = require('connect-flash');
const signs3Controller = require('./controllers/s3sign')


//local database conneection for local development
//mongoose.connect('mongodb://localhost/my_database', {useNewURLParser:true})

mongoose.connect(process.env.MONGO, {useNewURLParser:true})
/*
let port = 4000;
//let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}
app.listen(port, () => {
    console.log('App listening...')    
})
*/
app.listen(process.env.PORT);

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'node_modules')));  //look at this, dangerous
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(flash());

app.get('/', homeController)
app.get('/linkedin', homeController)
app.get('/homeData/:page',homeDataController)
app.get('/upload', newPostController)
app.post('/posts/store', storePostController)
app.post('/sendExifData', storePostController)
app.get('/sign-s3', signs3Controller)





