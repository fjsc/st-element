const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin')
const versionsPackageFilename = __dirname + "/package.json"
const basePackageValues = require('./config');

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  externals: isProd ? [nodeExternals()] : [],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new GeneratePackageJsonPlugin(basePackageValues, versionsPackageFilename),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
  ]
};
