require('dotenv').config()

// Declarations
const express = require('express')
const favicon = require('serve-favicon')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const cors = require('cors')

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

// // CONTENT SECURITY POLICY
// app.use((req, res, next) => {
//     res.setHeader(
//       'Content-Security-Policy',
//       "default-src 'self'; script-src 'self' example.com; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self' fonts.example.com;"
//     );
//     next();
// });

// ROUTES
// controllers
require('./controllers/index')(app)
require('./controllers/reporting')(app)

// START
app.listen(port, console.log('App listening on port ' + port))

module.exports = app
