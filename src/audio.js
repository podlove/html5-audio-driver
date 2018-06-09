import { compose } from 'ramda'

import { createSourceNodes, mediaNode } from './media'
import { mountNode, toArray } from './utils'

const audioNode = mediaNode('audio')

export const audio = compose(mountNode, createSourceNodes(audioNode), toArray)
