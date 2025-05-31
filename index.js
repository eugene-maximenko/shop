const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const { configureTemplateEngine } = require('./func')

const app = express()
configureTemplateEngine(app)

// Routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})