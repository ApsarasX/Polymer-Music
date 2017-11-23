// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    extends: 'airbnb-base',
    // required to lint *.vue files
    plugins: ['html'],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    rules: {
        // don't require .vue extension when importing
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                vue: 'never'
            }
        ],
        // allow optionalDependencies
        'import/no-extraneous-dependencies': [
            'error',
            {
                optionalDependencies: ['test/unit/index.js']
            }
        ],
        'import/first': 'absolute-first',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        indent: ['error', 4],
        'comma-dangle': ['error', 'never'],
        'spaced-comment': [
            'error',
            'always',
            {
                line: {
                    markers: ['/'],
                    exceptions: ['-', '+']
                },
                block: {
                    markers: ['!'],
                    exceptions: ['*'],
                    balanced: true
                }
            }
        ],
        'no-underscore-dangle': [
            'error',
            {
                allowAfterThis: true
            }
        ],
        'no-console': [
            'error',
            {
                allow: ['warn', 'error', 'info']
            }
        ],
        'arrow-parens': ['error', 'as-needed'],
        'no-unused-expressions': ['error', { allowShortCircuit: true }],
        'no-param-reassign': [
            'error',
            {
                props: false
            }
        ],
        'no-mixed-operators': 0
    }
};
