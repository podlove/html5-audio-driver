import 'file-loader?name=index.html!./index.html'

import {
  curry,
  compose,
  path
} from 'ramda'
import {
  audio
} from 'html5-audio-driver/audio'
import {
  actions
} from 'html5-audio-driver/actions'
import {
  events,
  onPlay
} from 'html5-audio-driver/events'
import {
  props
} from 'html5-audio-driver/props'

const debug = curry((category, payload) => {
  console.group(category)

  switch (typeof payload) {
    case 'number':
    case 'string':
      console.log('payload: ', payload)
      break
    case 'object':
      Object.keys(payload).map((key) => console.log(`${key}: `, payload[key]))
      break
  }

  console.groupEnd()
})

const myAudio = audio([{
  url: 'audio-files/example.m4a',
  mimeType: 'audio/mp4'
}, {
  url: 'audio-files/example.mp3',
  mimeType: 'audio/mp3'
}, {
  url: 'audio-files/example.ogg',
  mimeType: 'audio/pgg'
}])

const audioEvents = events(myAudio)
const audioActions = actions(myAudio)

// Props display
const displayProps = (audio) => input => {
  const element = document.getElementById('props')
  const playerProperties = props(audio)

  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }

  Object.keys(playerProperties).map(key => {
    const propNode = document.createElement('tr')
    propNode.innerHTML = `<td>${key}</td><td>${playerProperties[key]}</td>`
    element.appendChild(propNode)
  })

  return input
}

const onEvent = (event) => compose(displayProps(myAudio), debug(event))

audioEvents.onLoaded(onEvent('loaded'))
audioEvents.onLoading(onEvent('loading'))
audioEvents.onBuffering(onEvent('buffering'))
audioEvents.onBufferChange(onEvent('buffer changed'))
audioEvents.onPause(onEvent('paused'))
audioEvents.onPlay(onEvent('playing'))
audioEvents.onPlaytimeUpdate(onEvent('playtime'))
audioEvents.onError(onEvent('error'))
audioEvents.onEnd(onEvent('end'))
audioEvents.onRateChange(onEvent('rate changed'))
audioEvents.onDurationChange(onEvent('duration changed'))
audioEvents.onVolumeChange(onEvent('volume changed'))

/*
 * HTML BINDINGS
 */

// actions
const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')
const loadButton = document.getElementById('load')
const restartButton = document.getElementById('restart')
const muteButton = document.getElementById('mute')
const unmuteButton = document.getElementById('unmute')

loadButton.addEventListener('click', audioActions.load)
playButton.addEventListener('click', audioActions.play)
pauseButton.addEventListener('click', audioActions.pause)
muteButton.addEventListener('click', audioActions.mute)
unmuteButton.addEventListener('click', audioActions.unmute)
restartButton.addEventListener('click', compose(audioActions.play, () => audioActions.setPlaytime(0), audioActions.pause))

// attributes
const volumeInput = document.getElementById('volume')
const rateInput = document.getElementById('rate')

volumeInput.addEventListener('change', compose(audioActions.setVolume, path(['target', 'value'])))
rateInput.addEventListener('change', compose(audioActions.setRate, path(['target', 'value'])))

// INIT
displayProps(audio)()

audioActions.setPlaytime(50)
