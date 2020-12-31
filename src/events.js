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
  initialized,
  liveSync
} from './props'

// events
const eventFactory = (events, processor = props, factoryOptions = {}) =>
  curry((media, callback, runtimeOptions = {}) => {
    [].concat(events).forEach(event => {
      media.addEventListener(
        event,
        compose(callback, processor, getNodeFromEvent),
        Object.assign({}, factoryOptions, runtimeOptions)
      )
    })

    return media
  })


const onLoading = eventFactory('progress', props, {
  once: true
})

const onLoaded = eventFactory(['canplay', 'canplaythrough'], props, {
  once: true
})

const canPlay = eventFactory(['canplay', 'canplaythrough'], props, { once: true })

const onReady = eventFactory(['canplay', 'canplaythrough'], props)
const onPlay = eventFactory('play')
const onPause = eventFactory('pause')
const onEnd = eventFactory('ended')
const onFilterUpdate = eventFactory('filterUpdated', props)

const onBufferChange = eventFactory('progress', buffered)
const onBuffering = curry((media, callback, runtimeOptions = {}) => {
  media.addEventListener(
    'waiting',
    event => {
      const node = getNodeFromEvent(event)

      if (state(node) !== 'HAVE_ENOUGH_DATA') {
        callback(props(node))
      }
    },
    Object.assign({}, runtimeOptions)
  )

  return media
})

const onPlaytimeUpdate = eventFactory('timeupdate', playtime)
const onVolumeChange = eventFactory('volumechange', volume)
const onLiveSyncUpdate = eventFactory('livesyncupdate', liveSync)

const onError = curry((media, callback) => {
  media.addEventListener(
    'error',
    function ({ detail }) {
      const networkState = detail && detail.networkState

      switch (networkState || this.networkState) {
        case HTMLMediaElement.NETWORK_NO_SOURCE:
          return callback('NETWORK_NO_SOURCE', {})

        case HTMLMediaElement.NETWORK_EMPTY:
          return callback('NETWORK_EMPTY', {})
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
  onFilterUpdate,
  canPlay,
  onLiveSyncUpdate
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
  onFilterUpdate,
  canPlay,
  onLiveSyncUpdate
}
