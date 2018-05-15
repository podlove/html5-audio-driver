import { compose } from 'ramda'
import { getNodeFromEvent } from './utils'

const updatePlaytimeToCurrentTime = video => {
  video.playtime = video.currentTime
  return video
}

const updateCurrentTimeToPlaytime = video => {
  try {
    video.currentTime = video.playtime
  } catch (e) {}

  return video
}

// probe if html implemnetation has quirks (for Safari and IE)
const needsVirtualPlaytime = videoNode => {
  try {
    videoNode.currentTime = 10

    if (videoNode.currentTime === 0) {
      return true
    }
  } catch (e) {
    return true
  }

  return false
}

// HTML video implementation 101 quirks: on Safari and iOS you just can set currentTime after loading
const fixPlaytime = videoNode => {
  videoNode.playtime = 0

  videoNode.addEventListener('timeupdate',
    compose(updatePlaytimeToCurrentTime, getNodeFromEvent))

  if (needsVirtualPlaytime(videoNode)) {
    videoNode.addEventListener('canplay',
      compose(updateCurrentTimeToPlaytime, getNodeFromEvent), { once: true })
    videoNode.addEventListener('play',
      compose(updateCurrentTimeToPlaytime, getNodeFromEvent))
  } else {
    videoNode.currentTime = 0
  }

  return videoNode
}

export const video = (sources = []) => {
  sources = [].concat(sources)
  const videoNode = compose(fixPlaytime)(document.createElement('video'))

  videoNode.autoplay = false
  videoNode.loop = false
  videoNode.preload = 'none'
  videoNode.controls = false

  sources.map(source => {
    const sourceNode = document.createElement('source')
    sourceNode.setAttribute('src', source.url)
    sourceNode.setAttribute('type', source.mimeType)
    videoNode.appendChild(sourceNode)
  })

  document.body.appendChild(videoNode)
  return videoNode
}
