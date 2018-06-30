import { compose } from 'ramda'

import { createSourceNodes, mediaNode } from './media'
import { mountNode, toArray } from './utils'

export const audio = sources => compose(mountNode, createSourceNodes(mediaNode('audio')), toArray)(sources)
