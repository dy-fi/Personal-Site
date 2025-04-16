const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

module.exports = (app) => {
    app.get('/reporting', bodyParser.json(), (req, res) => {
        const now = new Date()
        const reportLog = path.resolve(__dirname, '../reports-log.json')

        fs.readFile(reportLog, 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
                res.status(400).end()
            } else {
                let report = JSON.stringify(req.body)
                let result = data + report + ' -- ' + now + '\n'
                
                fs.writeFile(reportLog, result, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).end()
                    } else {
                        console.log('Report written to report-log.json')
                    }
                })
            }
        })

        res.status(200).end()
    })
}