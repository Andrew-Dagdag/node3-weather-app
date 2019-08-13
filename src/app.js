const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for Express Configs
const pubPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pubPath))

app.get('', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name: "Andrew Dagdag"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Page",
    name: "Andrew Dagdag"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help Page",
    name: "Andrew Dagdag",
    message: "Sample message"
  })
})


app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'uwu must provide an address to search'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error){
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecast) => {
      if(error){
        return res.send({error})
      }

      res.send({
        forecast,
        location,
        query: req.query.address
      })
    })    
  })
})

app.get('/products', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: 'uwu must provide a search term'
    })
  }

  res.send({
    products:[]
  })
})

app.get('/help/*', (req, res) => {
  // res.send('halp')
  res.render('404', {
    title: "Aww :(",
    name: "Andrew Dagdag",
    errorMsg: "Yo can't find the help article ya lookin for"
  })

})

app.get('*', (req, res) => {
  res.render('404', {
    title: "Awww :(",
    name: "Andrew Dagdag",
    errorMsg: "Yo can't find yer page, 404 Error fam"
  })
  // res.send('404: uwu cant be found')
})

app.listen(3000, () => {
  console.log('Server up at http://localhost:3000')
})