// IO
const path = require('path')
const glob = require('glob')

const scripts = glob.sync('./test/**/*.test.js').reduce((result, file) =>
  Object.assign({}, result, {
    [path.parse(file).name]: file
  }), {
    runtime: './test/runtime.js'
  })

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: scripts,
  output: {
    path: path.resolve('./tmp'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      '@podlove/html5-audio-driver': path.resolve(__dirname, '..', 'src'),
      test: path.resolve('./test')
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  devServer: {
    contentBase: path.resolve('./tmp'),
    overlay: true,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}
