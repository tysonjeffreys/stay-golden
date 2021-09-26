require('dotenv').config();
const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const aws = require('aws-sdk');



//controllers
const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const findPostController = require('./controllers/findPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const logoutController = require('./controllers/logout')

const validateMiddleware = require('./middleware/validationMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const flash = require('connect-flash');



//mongoose.connect('mongodb://localhost/my_database', {useNewURLParser:true})

mongoose.connect('mongodb+srv://tmoney:FreedomTour@cluster0.87gz6.mongodb.net/my_database', {useNewURLParser:true})
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

const S3_BUCKET = process.env.AWS_BUCKET_NAME;
aws.config.region = 'us-east-1';

console.log('Current Directory:', __dirname);
path1 = path.resolve('users/admin', 'readme.md')
console.log(path1)

path2 = path.resolve('users', 'admin', 'readme.md')
console.log(path2)

path3 = path.resolve('/users/admin', "readme.md")
console.log(path3)

path4 = path.resolve(__dirname, '..', 'public/img')
console.log(path4)


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.json())
app.use(express.urlencoded({extended:true}))




//app.use('/posts/store', validateMiddleware)

//app.use(expressSession({
//    secret: 'keyboard cat'}))

//global.loggedIn = null;

//app.use("*", (req,res,next) => {
//    loggedIn = req.session.userId;
//    next()
//});

app.use(flash());

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/upload', newPostController)
app.post('/posts/store', storePostController)
app.get('/posts/:find', findPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)








app.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    console.log('This is the fileName: ' + fileName);
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 120,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        console.log(returnData)
        res.write(JSON.stringify(returnData));
        res.end();
    });
});

app.post('/sendExifData', storePostController)







//432-221-0204  