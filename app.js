require('dotenv').config()

// Declarations
const express = require('express');
const favicon = require('serve-favicon')
const exphbs = require('express-handlebars');
// const morgan = require('morgan');
const cors = require('cors');

// // HTTPS
// const https = require("https"),
//   fs = require("fs");
//
// const options = {
//   key: fs.readFileSync("SSL/privkey.pem"),
//   cert: fs.readFileSync("SSL/fullchain.pem")
// };

// export/environment
const app = express();
port = process.env.PORT || 5000;

// favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// Express handlebars

var handlebars = exphbs.create({
    defaultLayout: "main",
    helpers: {
      section: function(name, options) { 
        if (!this._sections) this._sections = {};
          this._sections[name] = options.fn(this); 
          return null;
        }
    }    
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// static scripts and styles in public
app.use(express.static('public'));

// app.use(morgan(':status :method :url :res[content-length] - :response-time ms'));

// MIDDLEWARE cors
app.use(cors())

// ROUTES
// controllers
require('./controllers/index')(app);

// START
app.listen(port, console.log('App listening on port ' + port));

module.exports = app;
