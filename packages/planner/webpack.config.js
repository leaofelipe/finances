const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = ({ mode = 'development' }) => ({
  mode,
  entry: './src/main.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 9000,
    historyApiFallback: true
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/modules/accountingTable/accountingTable.html',
          to: 'modules/accountingTable/'
        }
      ]
    })
  ]
})
