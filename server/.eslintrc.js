module.exports = {
    overrides: [
        {
            files: [ '**/*.*' ],
            rules: {
                'import/no-anonymous-default-export': 'off',
                'object-curly-spacing': [ "error", "always" ],
                'array-bracket-spacing': [ "error", "always" ],
            },
        },
    ],
    rules: {
        'import/prefer-default-export': 'off',
    },
    parserOptions: {
        ecmaVersion: "latest"
    },
    env: {
        es6: true
    }
};
