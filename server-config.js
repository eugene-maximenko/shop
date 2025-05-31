const exphbs = require('express-handlebars')
const express = require('express')

function configureTemplateEngine(app) {
    const hbs = exphbs.create({
        defaultLayout: 'main',  // Wrap for the target hbs
        extname: 'hbs'
    })

    app.engine('hbs', hbs.engine)   // Register the engine in the system
    app.set('view engine', 'hbs')   // Use the engine
    app.set('views', 'views')       // Directory with templates

    app.use(express.static('public')) // Make files in the "public" folder accessible via browser (e.g., CSS, images, JS)
}

const PORT = process.env.PORT || 3000

function runServer(app, PORT) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

module.exports = {
    configureTemplateEngine,
    PORT,
    runServer
}