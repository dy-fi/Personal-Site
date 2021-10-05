const path = require('path');

module.exports = {
    entry: ['./views/index.handlebars', './public/styles/main.css'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.html',
    },
    module: {
        rules: [
            { test: /\.handlebars$/, loader: 'handlebars-loader'},
            { 
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    }
}