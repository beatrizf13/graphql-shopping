module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['import', 'react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
    'react/prop-types': 'off',
    'no-unused-expressions': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never'
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {}
    },
  }
};
