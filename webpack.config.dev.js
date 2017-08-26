const {
  createConfig,
  defineConstants,
  entryPoint,
  setOutput,
  sourceMaps,
  resolveAliases
} = require('@webpack-blocks/webpack2')
const babel = require('@webpack-blocks/babel6')
const devServer = require('@webpack-blocks/dev-server2')
const path = require('path')

module.exports = createConfig([
  entryPoint({ example: './example/example.js' }),
  babel(),
  setOutput('./tmp/[name].js'),
  defineConstants({
    env: process.env.NODE_ENV
  }),
  resolveAliases({
    'html5-audio-driver': path.resolve('./')
  }),
  devServer({
    contentBase: path.resolve(__dirname, 'tmp'),
    host: '0.0.0.0',
    disableHostCheck: true
  }),
  sourceMaps()
])
