import { mono, stereo } from '@podlove/html5-audio-driver/filters'

// actions
const monoButton = document.getElementById('mono')
const stereoButton = document.getElementById('stereo')

export const registerFilters = node => {
  monoButton.addEventListener('click', () => mono(node))
  stereoButton.addEventListener('click', () => stereo(node))
}
