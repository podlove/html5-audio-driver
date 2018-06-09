import { compose } from 'ramda'

import { createSourceNodes, mediaNode } from './media'
import { toArray } from './utils'

const videoNode = mediaNode('video')

export const video = compose(createSourceNodes(videoNode), toArray)
