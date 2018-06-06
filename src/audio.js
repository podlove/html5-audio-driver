import { compose } from 'ramda'

import { createMedia, mediaNode } from './media'
import { mountNode, toArray } from './utils'

const audioNode = mediaNode('audio')

export const audio = compose(mountNode, createMedia(audioNode), toArray)
