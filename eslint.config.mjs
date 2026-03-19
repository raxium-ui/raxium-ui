import antfu from '@antfu/eslint-config'

export default antfu({
  vue: {
    overrides: {
      'vue-jsx/insert-space-between-items': 'off',
    },
  },
  typescript: true,
}, {
  ignores: ['*.js'],
}, {
  rules: {
    'ts/no-non-null-asserted-optional-chain': 'off',
    'ts/ban-ts-comment': 'warn',
    'ts/consistent-type-definitions': 'off',
    'ts/no-unsafe-function-type': 'off',
    'ts/no-unused-expressions': 'off',
    'ts/no-empty-object-type': 'off',
    'symbol-description': 'off',
    'no-console': 'off',
    'import/first': 'off',
    'import/order': 'off',
    'style/max-statements-per-line': ['error', { max: 2 }],
    'vue/one-component-per-file': 'off',
    'unicorn/prefer-dom-node-text-content': 'off',
    'unicorn/prefer-number-properties': 'off',
    'unused-imports/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'regexp/no-super-linear-backtracking': 'off',
  },
})
