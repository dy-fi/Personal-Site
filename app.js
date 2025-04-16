require('dotenv').config()

// Declarations
const express = require('express')
const favicon = require('serve-favicon')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')

// export/environment
const app = express()
const port = process.env.PORT || 3000

// favicon
app.use(favicon(__dirname + '/public/favicon.ico'))

// Express handlebars
var handlebars = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) { 
            if (!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    }    
})

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// static scripts and styles in public
app.use(express.static('public'))

app.use(morgan(':status :method :url :res[content-length] - :response-time ms'))

// MIDDLEWARE 

// CORS
app.use(cors())
// XSS sanitization and trimming
app.use(xss())
// HELMET CSP
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://code.jquery.com', 'https://cdnjs.cloudflare.com', 'https://stackpath.bootstrapcdn.com', 'https://dylanfinn.dev', 'https://unpkg.com', 'https://code.jquery.com/jquery-3.3.1.slim.min.js', 'https://cdn.jsdelivr.net', "'sha256-LLkkyZ6awYj0ueDmGAuY2sA/G/I1zmw90+cCSLi2GTE='", "'sha256-E6TLsp3X/FSYrUQa+PNgrr8ksspG6+3Ls1hedESfsas='"],
        styleSrc: ["'self'", 'https://code.jquery.com', 'https://stackpath.bootstrapcdn.com', 'https://dylanfinn.dev', 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com', 'https://cdn.jsdelivr.net', 'https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/2.15.1/js/jquery.terminal.min.js', "'unsafe-inline'"],
        connectSrc: ["'self'", 'https://dylanfinn.dev'],
        imgSrc: ["'self'", 'https://dylanfinn.dev', 'https://img.shields.io', 'https://www.emoji.co.uk'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    },
}))

// ROUTES
// controllers
require('./controllers/index')(app)
require('./controllers/reporting')(app)

// START
app.listen(port, console.log('App listening on port ' + port))

module.exports = app
