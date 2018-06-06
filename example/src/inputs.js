import { compose, path } from 'ramda'
import { actions } from '@podlove/html5-audio-driver'

const volumeInput = document.getElementById('volume')
const rateInput = document.getElementById('rate')

export const registerInputs = node => {
  const mediaActions = actions(node)
  volumeInput.addEventListener('change', compose(mediaActions.setVolume, path(['target', 'value'])))
  rateInput.addEventListener('change', compose(mediaActions.setRate, path(['target', 'value'])))
}

