const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const { configureTemplateEngine, PORT, runServer } = require('./server-config')

const app = express()           // Init app
configureTemplateEngine(app)    // Configure template engine

// Routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

runServer(app, PORT)