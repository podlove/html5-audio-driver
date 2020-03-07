import { compose } from 'ramda'

import { createSourceNodes, mediaNode } from './media'
import { mountNode } from './utils'
import { attatchStream } from './hls'
import { audio as createAudioElement } from './audio'

import { events as mediaEvents } from './events'
import { actions as mediaActions } from './actions'

// type -> MediaFacade
export const audio = () => {
  let mediaElement = null

  const actions = {
    play: () => {},
    pause: () => {},
    load: () => {},
    setPlaytime: () => {},
    mute: () => {},
    unmute: () => {},
    setVolume: () => {},
    setRate: () => {},
    reset: () => {}
  }

  const recievers = {
    onLoading: [],
    onLoaded: [],
    onPause: [],
    onBufferChange: [],
    onEnd: [],
    onPlaytimeUpdate: [],
    onVolumeChange: [],
    onError: [],
    onDurationChange: [],
    onRateChange: [],
    onPlay: [],
    onBuffering: [],
    onReady: [],
    onFilterUpdate: []
  }

  const registerEvent = eventType => handler => recievers[eventType].push(handler)

  const connect = sources => () => {
    // create a new media element
    mediaElement = createAudioElement(sources)
    attatchStream(mediaElement)

    // connect the events to existing recievers
    const eventEmitters = mediaEvents(mediaElement)
    Object.keys(eventEmitters).forEach(name => recievers[name].forEach(receiver => eventEmitters[name](receiver)))

    // update actions to new media element
    const actionEmitters = mediaActions(mediaElement)
    Object.keys(actionEmitters).forEach(name => actions[name] = actionEmitters[name])

    // call play
    actions.play()
  }

  const load = sources => {
    // remove media element
    mediaElement && mediaElement.parentNode.removeChild()
    actions.play = connect(sources)
  }

  return {
    mediaElement,
    load,
    events: {
      onLoading: registerEvent('onLoading'),
      onLoaded: registerEvent('onLoaded'),
      onPause: registerEvent('onPause'),
      onBufferChange: registerEvent('onBufferChange'),
      onEnd: registerEvent('onEnd'),
      onPlaytimeUpdate: registerEvent('onPlaytimeUpdate'),
      onVolumeChange: registerEvent('onVolumeChange'),
      onError: registerEvent('onError'),
      onDurationChange: registerEvent('onDurationChange'),
      onRateChange: registerEvent('onRateChange'),
      onPlay: registerEvent('onPlay'),
      onBuffering: registerEvent('onBuffering'),
      onReady: registerEvent('onReady'),
      onFilterUpdate: registerEvent('onFilterUpdate')
    },
    actions
  }
}
