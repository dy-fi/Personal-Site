require('dotenv').config()

// Declarations
const express = require('express');
const favicon = require('serve-favicon')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');

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
// app.use(favicon(__dirname + '/public/resources/favicon.ico'));

// Express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static scripts and styles in public
app.use(express.static('public'));

app.use(morgan('tiny'));

// MIDDLEWARE body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// ROUTES
// controllers
require('./controllers/index')(app);

// START
app.listen(port, console.log('App listening on port ' + port));

module.exports = app;
