import { compose } from 'ramda'
import { getNodeFromEvent } from './utils'

/**
 * Node Defaults
 *
 * Disables media defaults
 */

const setMediaDefaults = node => {
  node.autoplay = false
  node.loop = false
  node.preload = 'none'
  node.controls = false

  return node
}

/**
 * Playtime Polyfill
 *
 * Adds ability for Safari to set the playtime without the need of loading the full file
 */
const updatePlaytimeToCurrentTime = audio => {
  audio.playtime = audio.currentTime
  return audio
}

const updateCurrentTimeToPlaytime = audio => {
  try {
    audio.currentTime = audio.playtime
  } catch (e) {}

  return audio
}

// Probe if html implemnetation has quirks (for Safari and IE)
const needsVirtualPlaytime = audioNode => {
  try {
    audioNode.currentTime = 10

    if (audioNode.currentTime === 0) {
      return true
    }
  } catch (e) {
    return true
  }

  return false
}

// HTML Audio implementation 101 quirks: on Safari and iOS you just can set currentTime after loading
const polyfillPlaytime = node => {
  node.playtime = 0

  node.addEventListener('timeupdate', compose(updatePlaytimeToCurrentTime, getNodeFromEvent))

  if (needsVirtualPlaytime(node)) {
    node.addEventListener('canplay',
      compose(updateCurrentTimeToPlaytime, getNodeFromEvent), { once: true })
    node.addEventListener('play',
      compose(updateCurrentTimeToPlaytime, getNodeFromEvent))
  } else {
    node.currentTime = 0
  }

  return node
}

export const mediaPolyfill = compose(setMediaDefaults, polyfillPlaytime)
