import { curry, compose } from 'ramda'
import { getAudioFromEvent, collectProperties } from './utils'
import { props, playtime, volume, duration, rate, buffered } from './props'

// events
const eventFactory = (event, processor = props, factoryOptions = {}) =>
  curry((audio, callback, runtimeOptions = {}) => {
    audio.addEventListener(
      event,
      compose(callback, processor, getAudioFromEvent),
      Object.assign({}, factoryOptions, runtimeOptions)
    )

    return audio
  })

const onLoading = eventFactory('progress', props, { once: true })
const onLoaded = eventFactory('canplay', props)

const onPlay = eventFactory('play')
const onPause = eventFactory('pause')
const onEnd = eventFactory('ended')

const onBufferChange = eventFactory('progress', buffered)
const onBuffering = eventFactory('waiting')
const onPlaytimeUpdate = eventFactory('timeupdate', playtime)
const onVolumeChange = eventFactory('volumechange', volume)

const onError = curry((audio, callback) => {
  audio.addEventListener(
    'error',
    function (e) {
      switch (this.networkState) {
        case HTMLMediaElement.NETWORK_NO_SOURCE: {
          return callback('NETWORK_NO_SOURCE')
        }
        case HTMLMediaElement.NETWORK_EMPTY: {
          return callback('NETWORK_EMPTY')
        }
        case HTMLMediaElement.NETWORK_IDLE: {
          return callback('NETWORK_IDLE')
        }
        case HTMLMediaElement.NETWORK_LOADING: {
          return callback('NETWORK_LOADING')
        }
      }
    },
    true
  )

  return audio
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
  onBuffering
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
  onBuffering
}
