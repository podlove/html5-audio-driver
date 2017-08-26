import { path, compose } from 'ramda'
import { collectProperties } from './utils'

const transformBuffered = (buffered = []) => {
    let result = []
    for (let i = 0; i < buffered.length; i++) {
        result = [...result, {
            start: buffered.start(i),
            end: buffered.end(i)
        }]
    }
    return result
}

// Podpcast Props
const duration = path(['duration'])
const playtime = path(['currentTime'])
const buffered = compose(transformBuffered, path(['buffered']))
const volume = path(['volume'])
const ended = path(['ended'])
const rate = path(['playbackRate'])
const muted = path(['muted'])
const state = compose((state) => {
  switch (state) {
      case 0: {
        return 'HAVE_NOTHING'
      }
    case 1: {
        return 'HAVE_METADATA'
      }
    case 2: {
        return 'HAVE_CURRENT_DATA'
      }
    case 3: {
        return 'HAVE_FUTURE_DATA'
      }
    case 4: {
        return 'HAVE_ENOUGH_DATA'
      }
 }
}, path(['readyState']))

// TODO: make functional
const isPlaying = (podcast) =>
    podcast.currentTime > 0 &&
    !podcast.paused &&
    !podcast.ended &&
    podcast.readyState > 2


const props = collectProperties({duration, buffered, volume, state, playtime, ended, rate, muted, state, isPlaying})

export {
    duration,
    playtime,
    buffered,
    volume,
    ended,
    rate,
    muted,
    state,
    isPlaying,
    props
}
