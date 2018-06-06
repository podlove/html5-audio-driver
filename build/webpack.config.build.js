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
    utils: file('utils')
  },
  output: {
    path: path.resolve('./dist'),
    library: 'html-5-audio-driver',
    libraryTarget: 'umd',
    filename: '[name].js'
  }
}
