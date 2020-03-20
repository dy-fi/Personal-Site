const express = require('express');
const figlet = require('figlet');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_EMAIL_PASSWORD,
    }
})

module.exports = (app) => {
    // index
    app.get('/', (req, res) => {    
        res.render('index', {});
    });

    app.post('/email', (req, res) => {
        var email = req.body.email
        var subject = req.body.subject
        var content = req.body.content
        var mailOptions = {
            from: email,
            to: process.env.ADMIN_EMAIL,
            subject: subject,
            text: content,
        }

        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/', 200)
            }


        })
    });
}

