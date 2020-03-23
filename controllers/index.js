const express = require('express');
const figlet = require('figlet');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

var generator = xoauth2.createXOAuth2Generator({
    user: "dylan.finn@students.makeschool.com",
    clientId: process.env.GMAIL_OAUTH_ID,
    clientSecret: process.env.GMAIL_OAUTH_SECRET,
    refreshToken: process.env.GMAIL_OAUTH_REFRESH,
    accessToken: process.env.GMAIL_OAUTH_ACCESS,
})

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: generator,
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
                res.redirect('/', 200);
            }


        })
    });
}

