import { compose, map } from 'ramda'

import { appendNode, setAttributes, createNode } from './utils'
import { mediaPolyfill } from './polyfills'
import { audioContext } from './media-context'

const setNodeAttributes = compose(setAttributes, createNode)

const createSource = ({
  url,
  mimeType
}) => setNodeAttributes('source')({
  src: url,
  type: mimeType
})

const createSourceNodes = node => compose(appendNode(node), map(createSource))

const mediaNode = compose(audioContext, mediaPolyfill, createNode)

export { createSourceNodes, mediaNode }
