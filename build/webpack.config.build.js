const path = require('path')
const file = name => `./src/${name}.js`

module.exports = {
  mode: 'production',
  entry: {
    index: file('index'),
    actions: file('actions'),
    audio: file('audio'),
    video: file('video'),
    events: file('events'),
    props: file('props'),
    utils: file('utils'),
    hls: file('hls')
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: '@podlove/html5-audio-driver'
  }
}
