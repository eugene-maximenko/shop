const exphbs = require('express-handlebars')

function configureTemplateEngine(application) {
    const hbs = exphbs.create({
        defaultLayout: 'main',  // Wrap for the target hbs
        extname: 'hbs'
    })

    application.engine('hbs', hbs.engine)   // Register the engine in the system
    application.set('view engine', 'hbs')   // Use the engine
    application.set('views', 'views')       // Directory with templates
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