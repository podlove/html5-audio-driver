import { compose } from 'ramda'
import { getNodeFromEvent } from './utils'
import { initialized } from './props'

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
  node.playtime = 0
  node.initialized = false

  return node
}

/**
 * Playtime Polyfill
 *
 * Adds ability for Safari to set the playtime without the need of loading the full file
 */
const updatePlaytimeToCurrentTime = media => {
  media.playtime = media.currentTime
  return media
}

const updateCurrentTimeToPlaytime = media => {
  if (!initialized(media)) {
    return media
  }

  try {
    media.currentTime = media.playtime
  } catch (e) {}

  return media
}

const readyToPlay = node => {
  node.initialized = true

  return node
}

// HTML Audio implementation 101 quirks: on Safari and iOS you just can set currentTime after loading
const polyfillPlaytime = node => {
  node.playtime = 0

  node.addEventListener('timeupdate', compose(updatePlaytimeToCurrentTime, getNodeFromEvent))

  node.addEventListener('canplay',
    compose(updateCurrentTimeToPlaytime, readyToPlay, getNodeFromEvent), { once: true })

  node.addEventListener('play',
    compose(updateCurrentTimeToPlaytime, getNodeFromEvent))

  return node
}

export const mediaPolyfill = compose(setMediaDefaults, polyfillPlaytime)
