import { duration } from './props'
import { collectProperties } from './utils'

/**
 * ACTIONS
 */

// load :: AudioElement -> () -> AudioElement
const load = audio => () => {
  audio.load()
  return audio
}

// play :: AudioElement -> () -> AudioElement
const play = audio => () => {
  // Some browsers doesn't implement it as a promise
  try {
    audio
      .play()
      // safe play, fixes hides inconsistency in audio API
      .catch()
  } catch (e) {}

  return audio
}

// pause :: AudioElement -> () -> AudioElement
const pause = audio => () => {
  audio.pause()
  return audio
}

// mute :: AudioElement -> () -> AudioElement
const mute = audio => () => {
  audio.muted = true
  return audio
}

// unmute :: AudioElement -> () -> AudioElement
const unmute = audio => () => {
  audio.muted = false
  return audio
}

// setVolume :: AudioElement -> Number -> AudioElement
const setVolume = audio => (volume = 1) => {
  volume = parseFloat(volume)
  volume = volume < 0 ? 0 : volume
  volume = volume > 1 ? 1 : volume

  audio.volume = volume
  return audio
}

// setRate :: AudioElement -> Number -> AudioElement
const setRate = audio => (rate = 1) => {
  rate = parseFloat(rate)
  rate = rate > 4 ? 4 : rate
  rate = rate < 0.5 ? 0.5 : rate
  audio.playbackRate = parseFloat(rate)

  return audio
}

// setPlaytime :: AudioElement -> Number -> AudioElement
const setPlaytime = audio => (time = 0) => {
  const audioDuration = duration(audio)
  time = parseFloat(time)
  time = time > audioDuration ? audioDuration : time
  time = time < 0 ? 0 : time

  // Safe play for IE11+
  try {
    audio.playtime = time
    audio.currentTime = time
  } catch (e) {}

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
