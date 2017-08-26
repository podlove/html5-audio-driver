import { curry } from 'ramda'
import { duration } from './props'
import { collectProperties } from './utils'

// actions
const setPlaytime = audio => (time = 0) => {
    const audioDuration = duration(audio)
    time = parseFloat(time)
    time = time > audioDuration ? audioDuration : time
    time = time < 0 ? 0 : time

    audio.currentTime = time

    return audio
}

const play = audio => () => {
    audio
        .play()
        // safe play, fixes hides inconsistency in audio API
        .catch(() => {})

    return audio
}

const pause = audio => () => {
    audio.pause()
    return audio
}

const load = audio => () => {
    audio.load()
    return audio
}

const mute = audio => () => {
    audio.muted = true
    return audio
}

const unmute = audio => () => {
    audio.muted = false
    return audio
}

const setVolume = audio => (volume = 1) => {
    volume = parseFloat(volume)
    volume = volume < 0 ? 0 : volume
    volume = volume > 1 ? 1 : volume

    audio.volume = volume
    return audio
}

const setRate = audio => (rate = 1) => {
    audio.playbackRate = parseFloat(rate)

    return audio
}

const actions = collectProperties({
    play,
    pause,
    load,
    setPlaytime,
    mute,
    unmute,
    setVolume,
    setRate
})

export {
    play,
    pause,
    load,
    setPlaytime,
    mute,
    unmute,
    setVolume,
    setRate,
    actions
}
