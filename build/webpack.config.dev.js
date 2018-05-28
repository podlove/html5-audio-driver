const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: { example: './example/example.js' },
  output: {
    filename: './tmp/[name].js'
  },
  resolve: {
    alias: {
      'html5-audio-driver': '../src'
    }
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Audio Driver Test Env',
      template: './example/index.html'
    })
  ]
}
