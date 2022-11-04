const request = require('request');

const forecast = (lattitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=8cb47ae3db1034f63eaa39832f211cd0&query=' + longitude + ',' + lattitude;
    // http://api.weatherstack.com/current?access_key=8cb47ae3db1034f63eaa39832f211cd0&query=20.9042,74.7749
    console.log(url);
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined);
        }else if(body.error){
            callback('Unable to find location', undefined);
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. It feels like " + body.current.feelslike + " degress out.");
        }
    })
}


module.exports = forecast;