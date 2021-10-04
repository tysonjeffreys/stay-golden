const BlogPost = require('../models/BlogPost.js')
const NodeGeocoder = require('node-geocoder');
var states = require('us-state-codes');

const S3_BUCKET = process.env.AWS_BUCKET_NAME;

module.exports = (req,res) => {
    const fileName = req.query['file-name'];
    const exifData = (req.body);
    //If the exifdata does not contain location data the store process is aborted. Eventually
    //I will create an option for manully adding location and date data.
    if (typeof exifData.GPSLatitude !== 'undefined') {
        //Extracting the longitude and latitude data that will be used to find city/county and state. 
        let latDegrees = exifData.GPSLatitude[0]
        let latMin = exifData.GPSLatitude[1]/60
        let latSec = exifData.GPSLatitude[2]/3600
        let latDD = latDegrees + latMin + latSec
        
        let lonDegrees = exifData.GPSLongitude[0]
        let lonMin = exifData.GPSLongitude[1]/60
        let lonSec = exifData.GPSLongitude[2]/3600
        let lonDD = lonDegrees + lonMin + lonSec
        //console.log('This is LONDD: ' + lonDD)

        if (exifData.GPSLatitudeRef == 'S') {
            latDD = latDD * -1
        }

        if (exifData.GPSLongitudeRef == 'W') {
            lonDD = lonDD * -1
        }
        //console.log('This is latDD: ' + latDD)
        //console.log('This is lonDD: ' + lonDD)
        
        let imageDateFull = exifData.CreateDate
        let imageDate = imageDateFull.substring(0,10)
        let str = imageDate.split(" ")
        let dateStr = str[0].replace(/-/g, ",");
        let dateArray = dateStr.split(",")
        let [year, month, day] = dateArray
        
        //NodeGeocoder for finding the city/county and state location of the image.
        let options = {
            provider: 'openstreetmap'
        };
        let geoCoder = NodeGeocoder(options);
                            // Reverse Geocode
        geoDBwrite(function(response){
            
            let state = states.getStateCodeByStateName(response[0].state);
            //If the image location is not in an actual city the county is used instead.
            if (response[0].city == undefined) {
                let addressArray = response[0].formattedAddress.split(",")
                let city = addressArray.filter(s => s.includes('County')); 
                BlogPost.create({
                    ...req.body,
                    image: `https://${S3_BUCKET}.s3.amazonaws.com/800w-${fileName}`,
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
        })
        function geoDBwrite(callback) {
            geoCoder.reverse({lat:latDD, lon:lonDD})
            .then((res)=> {
                callback(res);
            })
            .catch((err)=> {
                console.log(err);
            });
        }
    res.end();
    }
        else { console.log('Image does not contain exif data.')
            res.status(404).send()
    }

}

