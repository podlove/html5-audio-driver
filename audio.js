import { compose } from 'ramda'
import { getAudioFromEvent } from './utils'

const updatePlaytimeToCurrentTime = audio => {
  audio.playtime = audio.currentTime
  return audio
}

const updateCurrentTimeToPlaytime = audio => {
  audio.currentTime = audio.playtime
  return audio
}

// HTML Audio implementation 101 quirks: on Safari and iOS you just can set currentTime after loading
const fixPlaytime = audioNode => {
  audioNode.playtime = 0

  audioNode.addEventListener('timeupdate',
    compose(updatePlaytimeToCurrentTime, getAudioFromEvent))

  // probe if html implemnetation has quirks
  audioNode.currentTime = 10

  if (audioNode.currentTime === 0) {
    audioNode.addEventListener('canplay',
      compose(updateCurrentTimeToPlaytime, getAudioFromEvent), { once: true })
    audioNode.addEventListener('play',
      compose(updateCurrentTimeToPlaytime, getAudioFromEvent))
  }

  audioNode.currentTime = 0

  return audioNode
}

export const audio = (sources = []) => {
  sources = [].concat(sources)
  const audioNode = compose(fixPlaytime)(document.createElement('audio'))

  audioNode.autoplay = false
  audioNode.loop = false
  audioNode.preload = 'none'
  audioNode.controls = false

  sources.map(source => {
    const sourceNode = document.createElement('source')
    sourceNode.setAttribute('src', source.url)
    sourceNode.setAttribute('type', source.mimeType)
    audioNode.appendChild(sourceNode)
  })

  document.body.appendChild(audioNode)
  return audioNode
}
