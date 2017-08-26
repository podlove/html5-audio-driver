const { createConfig, entryPoint, setOutput } = require('@webpack-blocks/webpack2')
const babel = require('@webpack-blocks/babel6')

module.exports = createConfig([
  entryPoint({
    bundle: './src/index.js',
    actions: './src/actions.js',
    props: './src/props.js',
    events: './src/events.js'
  }),
  babel(),
  setOutput('./[name].js')
])
