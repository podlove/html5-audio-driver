import { compose } from 'ramda'
import { actions } from '@podlove/html5-audio-driver'

// actions
const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')
const loadButton = document.getElementById('load')
const restartButton = document.getElementById('restart')
const muteButton = document.getElementById('mute')
const unmuteButton = document.getElementById('unmute')

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

export const registerConnectActions = connector => {
  loadButton.addEventListener('click', connector.actions.load)
  playButton.addEventListener('click', connector.actions.play)
  pauseButton.addEventListener('click', connector.actions.pause)
  muteButton.addEventListener('click', connector.actions.mute)
  unmuteButton.addEventListener('click', connector.actions.unmute)
  restartButton.addEventListener('click', compose(connector.actions.play, () => connector.actions.setPlaytime(0), connector.actions.pause))
}
