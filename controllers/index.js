const fs = require('fs')
const path = require('path')
// const nodemailer = require('nodemailer')

// var transporter = nodemailer.createTransport({
//     service: '',
//     auth: {
//         xoauth2: generator,
//     }
// })

module.exports = (app) => {
    // index
    app.get('/', (req, res) => {    
        res.render('index', {})
    })

    app.get('/portfolio', (req, res) => {
        let rawdata = fs.readFileSync(path.resolve(__dirname, '../projects.json'))
        let projects_list = JSON.parse(rawdata)
        let projects = projects_list.projects

        res.render('portfolio', {projects})
    })

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

