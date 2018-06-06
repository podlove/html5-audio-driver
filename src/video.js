import { compose } from 'ramda'

import { createMedia, mediaNode } from './media'
import { toArray } from './utils'

const videoNode = mediaNode('video')

export const video = compose(createMedia(videoNode), toArray)
