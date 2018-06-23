import { compose } from 'ramda'

import { createSourceNodes, mediaNode } from './media'
import { mountNode, toArray } from './utils'

export const video = sources => compose(mountNode, createSourceNodes(mediaNode('video')), toArray)(sources)
