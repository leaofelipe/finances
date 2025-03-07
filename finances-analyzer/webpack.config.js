require('dotenv/config')
const webpack = require('webpack')
const path = require('path')


const environmentVariables = [
  "AWS_BUCKET_NAME",
  "AWS_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY"
]

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /dist/, /basics/]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(environmentVariables)
  ]
}