import { curry, compose } from 'ramda'
import { getAudioFromEvent, collectProperties } from './utils'
import { props, playtime, volume, duration, rate } from './props'

// events
const eventFactory = (event, processor = props) => curry((audio, callback) => {
    audio.addEventListener(event, compose(callback, processor, getAudioFromEvent))

    return audio
})

const onLoading = curry((audio, callback) => {
    audio.addEventListener('progress', compose(callback, props, getAudioFromEvent), { once: true })

    return audio
})

const onLoaded = eventFactory('canplay')

const onPause = eventFactory('pause')
const onBuffer = eventFactory('waiting')
const onEnd = eventFactory('ended')

const onTimeUpdate = eventFactory('timeupdate', playtime)
const onVolumeChange = eventFactory('volumechange', volume)

const onError = curry((audio, callback) => {
    audio.addEventListener('error', function (e) {
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
    }, true)

    return audio
})

const onDurationChange = eventFactory('durationchange', duration)
const onRateChange = eventFactory('ratechange', rate)
const onPlay = eventFactory('play')

const events = collectProperties({
    onLoading,
    onLoaded,
    onPause,
    onBuffer,
    onEnd,
    onTimeUpdate,
    onVolumeChange,
    onError,
    onDurationChange,
    onRateChange,
    onPlay
})

export {
    onLoading,
    onLoaded,
    onPause,
    onBuffer,
    onEnd,
    onTimeUpdate,
    onVolumeChange,
    onError,
    onDurationChange,
    onRateChange,
    onPlay,
    events
}
