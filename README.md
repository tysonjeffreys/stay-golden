# staygolden.bike

### Simple image Web App ceated with Node, Express, and MongoDB

<br>

staygolden.bike is a full stack personal project I created to document my bike tour down the Pacific West Coast the summer of 2021. I wanted to create a simple full-stack app where I could upload images from my phone and have them appear with date and location on the website staygolden.bike.

<br>

## Technologies

- node : 12.16.3
- express : 4.17.1
- mongoose : 5.12.2
- MongoDB Atlas
- aws-sdk : 2.970.0
- ejs : 3.1.6
- exifr : 7.1.3,
- node-geocoder : 3.27.0
- us-state-codes : 1.1.2

<br>

- deployed on Heroku
- images stored on AWS S3

<br>

## Working Description
Once an image is uploaded, the exif data is extracted client-side using the exifr library. Exif data is sent to app and images are sent to S3. I used node-geocoder library to locate the city/county and state from the GPS coordinates. Data is stored in MongoDB's Atlas. Images are resized on S3 using lambda to save space. Staygolden.bike consists of one index page built mostly with client-side javascript.Images are displayed using infinite scroll with oldest images towards the bottom. I wanted a super clean simple website to display photos. That's it.