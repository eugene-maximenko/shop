const express = require('express')
const { configureTemplateEngine, PORT, runServer } = require('./server-config')
const { homeRoutes, addRoutes, coursesRoutes, cartRoutes } = require('./routes/index')

const app = express()           // Init app
configureTemplateEngine(app)    // Configure template engine
app.use(express.urlencoded({ extended: true }))


// Routes
app.use('/', homeRoutes)
// Naming?
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/cart', cartRoutes)

runServer(app, PORT)