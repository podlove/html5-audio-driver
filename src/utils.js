import {
  path,
  compose,
  reduce
} from 'ramda'

// Transformation utils
const collectProperties = (props = {}) => val =>
  Object.keys(props).reduce(
    (result, name) =>
    Object.assign({}, result, {
      [name]: props[name](val)
    }), {}
  )

const toArray = input => [].concat(input)

// Event Utils
const getNodeFromEvent = path(['target'])

// Dom Utils
const createNode = tag => document.createElement(tag)
const appendNode = node => compose(reduce((results, item) => {
  results.appendChild(item)
  return results
}, node), toArray)

const mountNode = child => compose(() => child, appendNode(document.body))(child)

const setAttributes = node => attributes =>
  Object.keys(attributes).reduce((result, key) => {
    result.setAttribute(key, attributes[key])
    return result
  }, node)

export {
  toArray,
  collectProperties,
  getNodeFromEvent,
  createNode,
  mountNode,
  setAttributes,
  appendNode
}
