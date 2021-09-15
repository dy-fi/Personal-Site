const express = require('express');
const nodemailer = require('nodemailer');


// var transporter = nodemailer.createTransport({
//     service: '',
//     auth: {
//         xoauth2: generator,
//     }
// })

module.exports = (app) => {
    // index
    app.get('/', (req, res) => {    
        res.render('index', {});
    });

    // app.post('/email', (req, res) => {
    //     var email = req.body.email
    //     var subject = req.body.subject
    //     var content = req.body.content

    //     var mailOptions = {
    //         from: email,
    //         to: process.env.ADMIN_EMAIL,
    //         subject: subject,
    //         text: content,
    //     }

    //     transporter.sendMail(mailOptions, function(err, info) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.redirect('/', 200);
    //         }


    //     })
    // });
}

