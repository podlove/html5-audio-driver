import { compose } from 'ramda'
import { events } from '@podlove/html5-audio-driver'

import { progressBar } from './inputs'
import { renderProps } from './dom'
import { log } from './console'

export const registerEvents = node => {
  const onEvent = (event) => compose(renderProps(node), log(event))
  const mediaEvents = events(node)
  renderProps(node)

  mediaEvents.onLoaded(onEvent('loaded'))
  mediaEvents.onLoading(onEvent('loading'))
  mediaEvents.onBuffering(onEvent('buffering'))
  mediaEvents.onBufferChange(onEvent('buffer changed'))
  mediaEvents.onPause(onEvent('paused'))
  mediaEvents.onPlay(onEvent('playing'))
  mediaEvents.onPlaytimeUpdate(onEvent('playtime'))
  mediaEvents.onError(onEvent('error'))
  mediaEvents.onEnd(onEvent('end'))
  mediaEvents.onRateChange(onEvent('rate changed'))
  mediaEvents.onDurationChange(onEvent('duration changed'))
  mediaEvents.onVolumeChange(onEvent('volume changed'))
  mediaEvents.onFilterUpdate(onEvent('filter updated'))
  mediaEvents.onPlaytimeUpdate(value => {
    progressBar.value = value / 250
  })
}
