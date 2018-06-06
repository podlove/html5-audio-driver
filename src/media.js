import { compose, map, ifElse } from 'ramda'

import { appendNode, setAttributes, createNode } from './utils'
import { mediaPolyfill } from './polyfills'
import { hasHLS, createHLSNode } from './hls'

const setNodeAttributes = compose(setAttributes, createNode)

const createSource = ({
  url,
  mimeType
}) => setNodeAttributes('source')({
  src: url,
  type: mimeType
})

const createSourceNodes = node => compose(appendNode(node), map(createSource))

const mediaNode = compose(mediaPolyfill, createNode)

const createMedia = node => ifElse(
  hasHLS,
  createHLSNode(node),
  createSourceNodes(node)
)

export { createMedia, mediaNode }
