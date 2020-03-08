import { duration, initialized } from './props'
import { collectProperties } from './utils'

/**
 * ACTIONS
 */

// load :: MediaElement -> () -> MediaElement
const load = media => () => {
  media.load()
  return media
}

// play :: MediaElement -> () -> MediaElement
const play = media => () => {
  // safe play, fixes inconsistency in media API
  try {
    // Some browsers doesn't implement it as a promise
    const playAction = media.play()

    // some does ~.~
    if (playAction && typeof playAction.catch !== 'undefined') {
      playAction.catch(e => {
        media.dispatchEvent(new CustomEvent('error-media', { detail: e }))
      })
    }

  } catch (e) {
    console.log(e)
    media.dispatchEvent(new CustomEvent('error-media', { detail: e }))
  }

  return media
}

// pause :: MediaElement -> () -> MediaElement
const pause = media => () => {
  media.pause()
  return media
}

// mute :: MediaElement -> () -> MediaElement
const mute = media => () => {
  media.muted = true
  return media
}

// unmute :: MediaElement -> () -> MediaElement
const unmute = media => () => {
  media.muted = false
  return media
}

// setVolume :: MediaElement -> Number -> MediaElement
const setVolume = media => (volume = 1) => {
  volume = parseFloat(volume)
  volume = volume < 0 ? 0 : volume
  volume = volume > 1 ? 1 : volume

  media.volume = volume
  return media
}

// setRate :: MediaElement -> Number -> MediaElement
const setRate = media => (rate = 1) => {
  rate = parseFloat(rate)
  rate = rate > 4 ? 4 : rate
  rate = rate < 0.5 ? 0.5 : rate
  media.playbackRate = parseFloat(rate)

  return media
}

// setPlaytime :: MediaElement -> Number -> MediaElement
const setPlaytime = media => (time = 0) => {
  const mediaDuration = duration(media)
  time = parseFloat(time)
  time = time > mediaDuration ? mediaDuration : time
  time = time < 0 ? 0 : time

  if (initialized(media)) {
    media.playtime = time
    media.currentTime = time
  } else {
    media.playtime = time
  }

  return media
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
