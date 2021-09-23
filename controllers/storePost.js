const BlogPost = require('../models/BlogPost.js')
const path = require('path')
const NodeGeocoder = require('node-geocoder');
var states = require('us-state-codes');

const S3_BUCKET = process.env.AWS_BUCKET_NAME;

module.exports = (req,res) => {
    const fileName = req.query['file-name'];
    console.log('THIS IS THE fileName: ' + fileName);
    const exifData = (req.body);
    console.log(exifData)
    let latDegrees = exifData.GPSLatitude[0]
    let latMin = exifData.GPSLatitude[1]/60
    let latSec = exifData.GPSLatitude[2]/3600
    let latDD = latDegrees + latMin + latSec
    console.log('This is LATDD: ' + latDD)

    let lonDegrees = exifData.GPSLongitude[0]
    let lonMin = exifData.GPSLongitude[1]/60
    let lonSec = exifData.GPSLongitude[2]/3600
    let lonDD = lonDegrees + lonMin + lonSec
    console.log('This is LONDD: ' + lonDD)

    if (exifData.GPSLatitudeRef == 'S') {
        latDD = latDD * -1
    }

    if (exifData.GPSLongitudeRef == 'W') {
        lonDD = lonDD * -1
    }
    console.log('This is latDD: ' + latDD)
    console.log('This is lonDD: ' + lonDD)

    let imageDateFull = exifData.CreateDate
    let imageDate = imageDateFull.substring(0,10)
    let str = imageDate.split(" ")
    let dateStr = str[0].replace(/-/g, ",");
    let dateArray = dateStr.split(",")
    console.log('This is the dateArray' + dateArray)
    let [year, month, day] = dateArray
    console.log('THIS IS THE day: ' + day)
    console.log(dateArray)
    
    console.log('This is the image date: ' + imageDate)

    let options = {
        provider: 'openstreetmap'
    };
    let geoCoder = NodeGeocoder(options);
                          // Reverse Geocode
                        geoDBwrite(function(response){
                            console.log('This is Async callback reponse ' + response[0].city);
                            
                            let state = states.getStateCodeByStateName(response[0].state);
                            if (response[0].city == undefined) {
                                let addressArray = response[0].formattedAddress.split(",")
                                let city = addressArray.filter(s => s.includes('County'));
                                console.log('This is CITY: ' + city)  
                                BlogPost.create({
                                    ...req.body,
                                    image: '/img/' + fileName,
                                    userid: req.session.userId,
                                    city: city[0],
                                    state: state,
                                    latitude: latDD,
                                    longitude: lonDD,
                                    datePosted: new Date(year,month-1,day)
            
                                })
                            } else city = response[0].city
                            BlogPost.create({
                                ...req.body,
                                image: `https://${S3_BUCKET}.s3.amazonaws.com/800w-${fileName}`,
                                //userid: req.session.userId,
                                city: city,
                                state: state,
                                latitude: latDD,
                                longitude: lonDD,
                                datePosted: new Date(year,month-1,day)
        
                            })
                            console.log('This is city defined: ' + city)
                            
                        })
                        function geoDBwrite(callback) {
                          geoCoder.reverse({lat:latDD, lon:lonDD})
                            .then((res)=> {
                              console.log(res);
                              console.log(res[0].city);
                              callback(res);
                            })
                            .catch((err)=> {
                              console.log(err);
                            });
                        } //geoDBwrite function close
/*
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'..', 'public/img', image.name),    
        (error) => { 
        
        
        let imagePath = path.resolve(__dirname,'..', 'public/img', image.name);
        console.log(imagePath)
        let ExifImage = require('exif').ExifImage;
        //let latDD = 0;
        
        try {
            new ExifImage({ image : imagePath }, async (error, exifData) => {
                if (error)
                    console.log('Error: '+error.message);
                else
                    //for (var i = 0; i< exifData.gps.GPSLatitude.length; i++){
                        //exifData.gps.GPSLatitude[i];
                        function iterate(item){
                            item = item/60;
                            console.log(item)
                        }
                        console.log(exifData)
                        let negDegree = 'S'
                        let latDegrees = exifData.gps.GPSLatitude[0]
                        let latMin = exifData.gps.GPSLatitude[1]/60
                        let latSec = exifData.gps.GPSLatitude[2]/3600
                        let latDD = latDegrees + latMin + latSec
                        console.log('This is LATDD: ' + latDD)
                        //let latDD =  47.700354
                       
                        let lonDegrees = exifData.gps.GPSLongitude[0]
                        let lonMin = exifData.gps.GPSLongitude[1]/60
                        let lonSec = exifData.gps.GPSLongitude[2]/3600
                        let lonDD = lonDegrees + lonMin + lonSec
                        //let lonDD = 124.413381
                        
                        
                        if (exifData.gps.GPSLatitudeRef == 'S') {
                            latDD = latDD * -1
                        }

                        if (exifData.gps.GPSLongitudeRef == 'W') {
                            lonDD = lonDD * -1
                        }
                        console.log('This is latDD: ' + latDD)
                        console.log('This is lonDD: ' + lonDD)

                        //parse date 
                        let imageDate = exifData.exif.CreateDate
                        let str = imageDate.split(" ")
                        let dateStr = str[0].replace(/:/g, ",");
                        let dateArray = dateStr.split(",")
                        let [year, month, day] = dateArray
                        console.log(year)
                        console.log(dateStr)
                        
                        console.log('This is the image date: ' + imageDate)

                        let options = {
                            provider: 'openstreetmap'
                          };
                           
                        let geoCoder = NodeGeocoder(options);
                          // Reverse Geocode
                        geoDBwrite(function(response){
                            console.log('This is Async callback reponse ' + response[0].city);
                            
                            let state = states.getStateCodeByStateName(response[0].state);
                            if (response[0].city == undefined) {
                                let addressArray = response[0].formattedAddress.split(",")
                                let city = addressArray.filter(s => s.includes('County'));
                                console.log('This is CITY: ' + city)  
                                BlogPost.create({
                                    ...req.body,
                                    image: '/img/' + image.name,
                                    userid: req.session.userId,
                                    city: city[0],
                                    state: state,
                                    latitude: latDD,
                                    longitude: lonDD,
                                    datePosted: new Date(year,month-1,day)
            
                                })
                            } else city = response[0].city
                            BlogPost.create({
                                ...req.body,
                                image: '/img/' + image.name,
                                //userid: req.session.userId,
                                city: city,
                                state: state,
                                latitude: latDD,
                                longitude: lonDD,
                                datePosted: new Date(year,month-1,day)
        
                            })
                            console.log('This is city defined: ' + city)
                            
                        })
                        function geoDBwrite(callback) {
                          geoCoder.reverse({lat:latDD, lon:lonDD})
                            .then((res)=> {
                              console.log(res);
                              console.log(res[0].city);
                              callback(res);
                            })
                            .catch((err)=> {
                              console.log(err);
                            });
                        } //geoDBwrite function close
                       
            });
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    
    
    


        console.log('This is the request object from create.ejs ' + req.body.title)
        
      
        res.redirect('/')
    })
    */
   res.redirect('/')
}

