/* global HTMLMediaElement */
import Hls from 'hls.js/dist/hls.light'
import { compose } from 'ramda'

import { events } from './events'
import { toArray, getMediaSources } from './utils'

// See: https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/StreamingMediaGuide/DeployingHTTPLiveStreaming/DeployingHTTPLiveStreaming.html
const hlsSource = compose((sources) => sources.reduce((result, source) =>
  result || ~['application/x-mpegURL', 'vnd.apple.mpegURL'].indexOf(source.mimeType) ? source.url : null, null), toArray)

export const isHLS = (sources = []) => {
  if (!Hls.isSupported()) {
    return false
  }

  return !!hlsSource(sources)
}

export const attatchStream = media => {
  if (!Hls.isSupported()) {
    return media
  }

  const hls = new Hls()
  const sources = getMediaSources(media)

  const hlsStream = hlsSource(sources)
  const mediaEvents = events(media)

  if (!hlsStream) {
    return media
  }

  hls.attachMedia(media)

  // Load the stream on play
  mediaEvents.onPlay(() => {
    hls.loadSource(hlsStream)
  }, { once: true })

  // Translate errors to native media errors
  hls.on(Hls.Events.ERROR, function (event, data) {
    switch (data.details) {
      case Hls.ErrorDetails.NETWORK_ERROR:
        hls.startLoad()
        media.dispatchEvent(new CustomEvent('error', { detail: { networkState: HTMLMediaElement.NETWORK_EMPTY } }))
        break
      default:
        hls.destroy()
        media.dispatchEvent(new CustomEvent('error', { detail: { networkState: HTMLMediaElement.NETWORK_NO_SOURCE } }))
        break
    }
  })

  return media
}

