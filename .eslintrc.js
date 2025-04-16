module.exports = {
    'env': {
        'browser': true,
        'commonjs': false,
        'es2021': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12
    },
    'rules': {
        'indent': [
            'error'
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single',
            { avoidEscape: true }
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-constant-condition': [
            'error'
        ]
    }
}
