import Hls from 'hls.js/dist/hls.light'

// See: https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/StreamingMediaGuide/DeployingHTTPLiveStreaming/DeployingHTTPLiveStreaming.html
const hlsSource = (sources) => sources.reduce((result, source) =>
  result || ~['application/x-mpegURL', 'vnd.apple.mpegURL'].indexOf(source.mimeType) ? source.url : null, null)

export const hasHLS = (sources = []) => {
  if (!Hls.isSupported()) {
    return false
  }

  return !!hlsSource(sources)
}

export const createHLSNode = media => (sources = []) => {
  const hls = new Hls()
  const hlsStream = hlsSource(sources)

  if (!hlsStream) {
    return media
  }

  media.hls = hls
  hls.attachMedia(media)

  hls.on(Hls.Events.MEDIA_ATTACHED, () => {
    hls.loadSource(hlsStream)
  })

  return media
}

export const hlsErrorHandler = (hls, callback) => {
  hls.on(Hls.Events.ERROR, function (event, data) {
    switch (data.details) {
      case Hls.ErrorDetails.NETWORK_ERROR:
        hls.startLoad()
        return callback('NETWORK_ERROR')
      case Hls.ErrorDetails.MEDIA_ERROR:
        hls.recoverMediaError()
        return callback('MEDIA_ERROR')
      default:
        hls.destroy()
        return callback('OTHER_ERROR')
    }
  })
}
