/* global HTMLMediaElement */
import {
  curry,
  compose
} from 'ramda'
import {
  getNodeFromEvent,
  collectProperties
} from './utils'
import {
  props,
  playtime,
  volume,
  duration,
  rate,
  buffered,
  state,
  initialized
} from './props'

// events
const eventFactory = (event, processor = props, factoryOptions = {}) =>
  curry((media, callback, runtimeOptions = {}) => {
    media.addEventListener(
      event,
      compose(callback, processor, getNodeFromEvent),
      Object.assign({}, factoryOptions, runtimeOptions)
    )

    return media
  })


const onLoading = eventFactory('progress', props, {
  once: true
})

const onLoaded = eventFactory('canplaythrough', props, {
  once: true
})

const onReady = curry((media, callback, runtimeOptions = {}) => {
  const readyEvent = media.addEventListener(
    'timeupdate',
    event => {
      const node = getNodeFromEvent(event)

      if (state(node) !== 'HAVE_ENOUGH_DATA') {
        return
      }

      media.initialized = true
      media.removeEventListener('timeupdate', readyEvent)
      callback(props(node))
    },
    Object.assign({}, runtimeOptions)
  )

  return media
})

eventFactory('timeupdate', props)

const onPlay = eventFactory('play')
const onPause = eventFactory('pause')
const onEnd = eventFactory('ended')
const onFilterUpdate = eventFactory('filterUpdated', props)

const onBufferChange = eventFactory('progress', buffered)
const onBuffering = eventFactory('waiting')
const onPlaytimeUpdate = eventFactory('timeupdate', playtime)
const onVolumeChange = eventFactory('volumechange', volume)

const onError = curry((media, callback) => {
  media.addEventListener(
    'error',
    function ({ detail }) {
      // media element refresh
      if (!media.firstChild) {
        return
      }

      const networkState = detail && detail.networkState

      switch (networkState || this.networkState) {
        case HTMLMediaElement.NETWORK_NO_SOURCE:
          return callback('NETWORK_NO_SOURCE', {})

        case HTMLMediaElement.NETWORK_EMPTY:
          return callback('NETWORK_EMPTY', {})

        case HTMLMediaElement.NETWORK_LOADING:
          return callback('NETWORK_LOADING', {})
      }
    },
    true
  )

  media.addEventListener(
    'error-media',
    function ({ detail }) {
      const stoppedByUserCodes = [
        0, // safari
        20, // chrome & firefox
      ]

      if (!initialized(media)) {
        return
      }

      if (stoppedByUserCodes.includes(detail.code)) {
        return
      }

      callback('MEDIA_ERROR', detail)
    }, false
  )

  return media
})

const onDurationChange = eventFactory('durationchange', duration)
const onRateChange = eventFactory('ratechange', rate)

const events = collectProperties({
  onLoading,
  onLoaded,
  onPause,
  onBufferChange,
  onEnd,
  onPlaytimeUpdate,
  onVolumeChange,
  onError,
  onDurationChange,
  onRateChange,
  onPlay,
  onBuffering,
  onReady,
  onFilterUpdate
})

export {
  onLoading,
  onLoaded,
  onPause,
  onBufferChange,
  onEnd,
  onPlaytimeUpdate,
  onVolumeChange,
  onError,
  onDurationChange,
  onRateChange,
  onPlay,
  events,
  onBuffering,
  onReady,
  onFilterUpdate
}
