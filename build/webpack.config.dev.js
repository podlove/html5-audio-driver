const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    audio: './example/audio.js',
    'audio-hls': './example/audio-hls.js',
    video: './example/video.js',
    'video-hls': './example/video-hls.js',
    'audio-connect': './example/audio-connect.js'
  },
  output: {
    filename: './tmp/[name].js'
  },
  resolve: {
    alias: {
      '@podlove/html5-audio-driver': path.resolve(__dirname, '..', 'src')
    }
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /node_modules/
    }, {
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, '..', 'node_modules', 'milligram', 'dist', 'milligram.min.css'),
        path.resolve(__dirname, '..', 'node_modules', 'normalize.css', 'normalize.css')
      ]
    })
  ]
}
