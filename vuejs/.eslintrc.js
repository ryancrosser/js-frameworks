// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html',
    "flowtype-errors"
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    "flowtype-errors/show-errors": 2,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    'max-len': ['error', { 'code': 200, 'ignoreTrailingComments': true, 'ignoreComments': true }],
    // allow console during development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // all unused variables during development
    'no-unused-vars': process.env.NODE_ENV === 'production' ? ['error', { argsIgnorePattern: '^__' }] : ['warn', { argsIgnorePattern: '^__' }],
    'comma-dangle': ['error', 'never'],
    'no-plusplus': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'no-use-before-define': 'off'
  }
}
