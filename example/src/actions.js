import { compose } from 'ramda'
import { actions } from '@podlove/html5-audio-driver'

// actions
export const playButton = document.getElementById('play')
export const pauseButton = document.getElementById('pause')
export const loadButton = document.getElementById('load')
export const restartButton = document.getElementById('restart')
export const muteButton = document.getElementById('mute')
export const unmuteButton = document.getElementById('unmute')

export const registerActions = node => {
  const mediaActions = actions(node)

  window.actions = mediaActions

  loadButton.addEventListener('click', mediaActions.load)
  playButton.addEventListener('click', mediaActions.play)
  pauseButton.addEventListener('click', mediaActions.pause)
  muteButton.addEventListener('click', mediaActions.mute)
  unmuteButton.addEventListener('click', mediaActions.unmute)
  restartButton.addEventListener('click', compose(mediaActions.play, () => mediaActions.setPlaytime(0), mediaActions.pause))
}
