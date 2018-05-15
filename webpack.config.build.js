const path = require('path')

const { createConfig, entryPoint, setOutput } = require('@webpack-blocks/webpack2')
const babel = require('@webpack-blocks/babel6')

module.exports = createConfig([
  entryPoint({
    index: './index.js',
    actions: './actions.js',
    audio: './audio.js',
    video: './video.js',
    events: './events.js',
    props: './props.js'
  }),
  babel(),
  setOutput({
    libraryTarget: 'commonjs',
    filename: '[name].js',
    path: path.resolve('./dist')
  })
])
