import { compose, path } from 'ramda'
import { actions } from '../../SRC'

export const volumeInput = document.getElementById('volume')
export const rateInput = document.getElementById('rate')
export const progressBar = document.getElementById('progress')

export const registerInputs = node => {
  const mediaActions = actions(node)

  volumeInput.addEventListener('change', compose(mediaActions.setVolume, path(['target', 'value'])))
  rateInput.addEventListener('change', compose(mediaActions.setRate, path(['target', 'value'])))
  progressBar.addEventListener('change', compose(mediaActions.setPlaytime, val => val * 250, path(['target', 'value'])))
}
