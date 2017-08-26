// IO
const path = require('path')
const glob = require('glob')

// Webpack
const { createConfig, entryPoint, setOutput, sourceMaps, resolveAliases, env } = require('@webpack-blocks/webpack2')
const devServer = require('@webpack-blocks/dev-server2')
const babel = require('@webpack-blocks/babel6')

const scripts = glob.sync('./test/**/*.test.js').reduce((result, file) => {
  return Object.assign({}, result, {
    [path.parse(file).name]: file
  })
}, { runtime: './test/runtime.js' })

module.exports = createConfig([
  entryPoint(scripts),
  babel(),
  setOutput('./tmp/[name].js'),
  resolveAliases({
    'html5-audio-driver': path.resolve('./'),
    test: path.resolve('./test')
  }),
  env('development', [
    devServer({
      contentBase: path.resolve('tmp'),
      overlay: true,
      host: '0.0.0.0',
      disableHostCheck: true
    })
  ]),
  sourceMaps()
])
