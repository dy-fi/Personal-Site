const fs = require('fs')
const path = require('path')


module.exports = (app) => {
    // index
    app.get('/', (req, res) => {    
        res.render('index', {message: ''})
    })

    app.get('/portfolio', (req, res) => {
        let rawdata = fs.readFileSync(path.resolve(__dirname, '../projects.json'))
        let projects_list = JSON.parse(rawdata)
        let projects = projects_list.projects

        res.render('portfolio', {projects})
    })
}

