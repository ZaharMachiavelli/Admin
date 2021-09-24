module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'edge >= 16',
            'safari >= 9',
            'firefox >= 57',
            'ie >= 11',
            'ios >= 9',
            'chrome >= 49',
          ],
        },
        useBuiltIns: 'entry',
        corejs: '3',
      },
    ],
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties"],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@': './src',
        },
      },
    ],
  ],
};
