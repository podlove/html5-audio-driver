import { path } from 'ramda'

const collectProperties = (props = {}) => val =>
  Object.keys(props).reduce(
    (result, name) =>
      Object.assign({}, result, { [name]: props[name](val) }),
    {}
  )

const getNodeFromEvent = path(['target'])

export { collectProperties, getNodeFromEvent }
