import { path } from 'ramda'

const collectProperties = (props = {}) => val =>
  Object.keys(props).reduce(
    (result, name) =>
      Object.assign({}, result, { [name]: props[name](val) }),
    {}
  )

const getAudioFromEvent = path(['target'])

export { collectProperties, getAudioFromEvent }
