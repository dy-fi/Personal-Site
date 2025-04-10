const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const { check, validationResult, matchedData, body } = require('express-validator')

function writeToReportLog(message, res) {
    const now = new Date()
    let reportLog = path.resolve(__dirname, '../reports-log.json')

    fs.readFile(reportLog, 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(400).end()
        } else {
            report = JSON.stringify(message)
            result = data + report + ' ' + now + '\n'
            
            fs.writeFile(reportLog, result, (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).end()
                } else {
                    console.log("Report written to report-log.json")
                }
            })
        }
    })
    res.status(200).end()
}

module.exports = (app) => {

    app.post('/reporting', bodyParser.json(), (req, res) => {
        const validationErrors = validationResult(req.body)

        if (validationErrors.isEmpty) {
            writeToReportLog(req.body, res)
        } else {
            message = 'Report Log failed validation: ' + validationErrors
            writeToReportLog(message, res)
        }
    })
}