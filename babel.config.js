module.exports = {
  presets: [
    [
      '@babel/preset-env',

      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@entities': './src/entities',
        '@controllers': './src/controllers',
        '@repositories': './src/repositories',
      }
    }],
    ['@babel/plugin-proposal-decorators', { 'legacy': true }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}