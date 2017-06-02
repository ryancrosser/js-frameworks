module.exports = {
  extends: 'airbnb-base/legacy',
  env: {
    mocha: true,
    protractor: true
  },
  globals: {
    angular: true,
    L: true,
    INFO: true,
    Promise: true,
    cytoscape: true
  },
  rules: {
      indent: [2, 4, {'SwitchCase': 1}],
      'comma-dangle': [2, 'never'],
      'wrap-iife': [2, 'inside'],
      'dot-notation': [2],
      'quote-props': [2, 'as-needed', {'keywords': true}],
      'no-restricted-syntax': [2, 'WithStatement'],
      'consistent-this': [2, 'vm'],

      'max-len': [1, 200, 4, {'ignoreUrls': true, 'ignoreComments': true}],
      'no-console': 1,
      'arrow-spacing': 1,
      'no-unused-vars': [1, {'argsIgnorePattern': '^__'}],
      'arrow-body-style': [1, 'as-needed'],
      'object-curly-spacing': [0, 'never'],
      'keyword-spacing': 1,
      'space-before-blocks': 1,
      'space-before-function-paren': 1,
      'no-loop-func': 1,
      'block-scoped-var': 1,

      'default-case': 1,

      'prefer-const': 0,Ï
      'func-names': 0,
      'no-use-before-define': 0,
      'vars-on-top': 0,
      'no-param-reassign': 0,
      'no-underscore-dangle': 0,
      'padded-blocks': 0
    }
}
