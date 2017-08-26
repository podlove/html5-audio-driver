const { createConfig, defineConstants, env, entryPoint, setOutput, sourceMaps, resolveAliases } = require('@webpack-blocks/webpack2')
const babel = require('@webpack-blocks/babel6')
const devServer = require('@webpack-blocks/dev-server2')
const path = require('path')

module.exports = createConfig([
    entryPoint({bundle: './src/index.js', example: './example/example.js'}),
    babel(),
    setOutput('./example/[name].js'),
    defineConstants({
        'env': process.env.NODE_ENV
    }),
    resolveAliases({
        driver: path.resolve('./src')
    }),
    devServer({
        contentBase: path.resolve(__dirname, 'example')
    }),
    sourceMaps()
])
