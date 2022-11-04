const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./src/utils/geocode')
const forecast = require('./src/utils/forecast')

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "Yash Lakade"
    });
});


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(lattitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Yash Lakade'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Some helpful info'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yash Lakade',
        errorMessage: 'Page not found.'
    })
})

app.listen(process.env.port || 3000, () => {
    console.log('Application is running on port 3000!');
});