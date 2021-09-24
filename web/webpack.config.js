const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const DotenvPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
require('dotenv').config({ path: './.env' });

const appDirectory = path.resolve(__dirname, '../');
const isDevelopment = process.env.NODE_ENV !== 'production';
// console.log('process.env', process.env);
console.log('process.env.PUBLIC_DEV_URL', process.env.PUBLIC_DEV_URL);
console.log('isDevelopment', isDevelopment);
const tsLoaderConfiguration = {
  test: /\.tsx?$/,
  include: [path.resolve(appDirectory, 'src')],
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
      },
    },
    {
      loader: 'ts-loader',
    },
  ],
};

const babelLoaderConfiguration = {
  test: /\.jsx?$/,
  include: [path.resolve(appDirectory, 'index.js'), path.resolve(appDirectory, 'src')],
  use: {
    loader: 'babel-loader',
    options: {
      plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg|mp3|ogg|eot|ttf|woff2?)$/,
  exclude: /(node_modules)/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[path]/[name]-[hash:16].[ext]',
      esModule: false,
    },
  },
};

const cssLoaderConfiguration = {
  test: /\.css$/i,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 0,
        modules: {
          localIdentName: '[name]__[local]___[hash:base64:5]',
          auto: (resourcePath) => !resourcePath.endsWith('.global.css') && !resourcePath.includes('node_modules'),
        },
      },
    },
  ],
};

const sassLoaderConfiguration = {
  test: /\.s[ac]ss$/i,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: {
          localIdentName: '[name]__[local]___[hash:base64:5]',
          auto: (resourcePath) => !resourcePath.endsWith('.global.scss') && !resourcePath.includes('node_modules'),
        },
      },
    },
    'postcss-loader',
    'sass-loader',
  ],
};

const fileLoaderConfiguration = {
  test: /\.webmanifest$/,
  exclude: /node_modules/,
  use: 'file-loader',
};

const packageVersion = require('../package.json').version;
module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devServer: {
    host: process.env.WEBPACK_DEV_SERVER_HOST,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    clientLogLevel: 'none',
    public: process.env.PUBLIC_DEV_URL,

    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  devtool: isDevelopment ? 'eval-source-map' : false,
  entry: [path.resolve(appDirectory, 'index.js')],
  output: {
    filename: '[name].bundle-[hash:16].js',
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '',
  },
  module: {
    rules: [
      tsLoaderConfiguration,
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      cssLoaderConfiguration,
      sassLoaderConfiguration,
      fileLoaderConfiguration,
    ],
  },
  optimization: {
    // minimizer: [
    //   new TerserPlugin({
    //     terserOptions: {
    //       compress: {
    //         drop_console: !isDevelopment,
    //       },
    //     },
    //   }),
    // ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DotenvPlugin({ systemvars: true }),
    new webpack.DefinePlugin({ __DEV__: isDevelopment, __VERSION__: `"${packageVersion}"` }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../src/assets/Favicon'), to: 'src/assets/Favicon' },
        { from: path.resolve(__dirname, '../src/assets/lib'), to: 'src/assets/lib' },
        { from: path.resolve(__dirname, '../src/sw.js'), to: 'src/' },
      ],
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
