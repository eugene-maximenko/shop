const express = require('express')
const { configureTemplateEngine, PORT, runServer } = require('./server-config')
const { homeRoutes, addRoutes, coursesRoutes } = require('./routes/index')

const app = express()           // Init app
configureTemplateEngine(app)    // Configure template engine

// Routes
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)

runServer(app, PORT)