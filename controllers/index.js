const express = require('express');
const figlet = require('figlet');

module.exports = (app) => {
    // index
    app.get('/', (req, res) => {    
        res.render('index', {});
    })
}

