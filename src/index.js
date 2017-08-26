import { curry } from 'ramda'

import './actions'
import './events'
import './props'

export const audio = curry((sources = [], { autoplay = false, loop = false, preload = 'none' }) => {
    sources = [].concat(sources)
    const audioNode = document.createElement('audio')

    audioNode.autoplay = autoplay
    audioNode.loop = loop
    audioNode.preload = preload

    sources.map((source) => {
        const sourceNode = document.createElement('source')
        sourceNode.setAttribute('src', source.url)
        sourceNode.setAttribute('type', source.mimeType)
        audioNode.appendChild(sourceNode)
    })

    document.body.appendChild(audioNode)
    return audioNode
})
