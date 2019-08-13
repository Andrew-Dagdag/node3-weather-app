const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/2b32b890264977e76cde4dfe8c71f238/${latitude}, ${longitude}?units=si`
  request({ url, json: true}, (error, {body}) => {
    if(error){
      callback('Cannot connect to weather services', undefined)
    }else if(body.error){
      callback('Unable to find location', undefined)
    }else{
      const daily = body.daily
      const currently = body.currently
      const text = `${daily.summary} It is currently ${currently.temperature}. There is a ${Math.floor(currently.precipProbability*100)}% chance of rain.`
      callback(undefined, text)
    }
  })
}

module.exports = forecast