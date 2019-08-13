const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ29vZGRvZ2Fib3ZlIiwiYSI6ImNqejljNjY4azBibGgzaHF1YjdlcmRwazcifQ.Lg7brYihkG-MsFGm7ccHKA&limit=1`

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services')
        }else if(!body.features.length){
            callback('Unable to find location. Try another search')
        }else{
            const center = body.features[0].center
            const location = body.features[0].place_name
            callback(undefined, {
                longitude: center[0],
                latitude: center[1],
                location
            })
        }
    })
}

module.exports = geocode