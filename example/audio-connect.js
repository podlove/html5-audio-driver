import { compose, path } from 'ramda'
import 'file-loader?name=index.html!./index.html'
import m4a from 'file-loader!./audio-files/example.m4a'
import mp3 from 'file-loader!./audio-files/example.mp3'
import ogg from 'file-loader!./audio-files/example.ogg'

import { connect, props } from '@podlove/html5-audio-driver'
import { loadButton, playButton, pauseButton, muteButton, unmuteButton, restartButton } from './src/actions'
import { volumeInput, rateInput, progressBar } from './src/inputs'
import { log } from './src/console'


const connector = connect.audio()

const load = () => connector.load([{
  url: 'https://mcdn.br.de/br/hf/b5/master.m3u8',
  title: 'HLS Stream',
  mimeType: 'application/x-mpegURL'
}])

// actions
loadButton.addEventListener('click', () => load())
playButton.addEventListener('click', () => connector.actions.play())
pauseButton.addEventListener('click', () => connector.actions.pause())
muteButton.addEventListener('click', () => connector.actions.mute())
unmuteButton.addEventListener('click', () => connector.actions.unmute())
restartButton.addEventListener('click', compose(() => connector.actions.play(), () => connector.actions.setPlaytime(0), () => connector.actions.pause()))

// inputs
volumeInput.addEventListener('change', compose(val => connector.actions.setVolume(val), path(['target', 'value'])))
rateInput.addEventListener('change', compose(val => connector.actions.setRate(val), path(['target', 'value'])))
progressBar.addEventListener('change', compose(val => connector.actions.setPlaytime(val * 250), path(['target', 'value'])))

// Props
const renderProps = () => {
  const element = document.getElementById('props')
  const playerProperties = props(connector.mediaElement)

  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }

  Object.keys(playerProperties).map(key => {
    const propNode = document.createElement('tr')
    propNode.innerHTML = `<td>${key}</td><td>${playerProperties[key]}</td>`
    element.appendChild(propNode)
  })
}

// Events
const onEvent = (event) => compose(renderProps, log(event))
connector.events.onLoaded(onEvent('loaded'))
connector.events.onLoading(onEvent('loading'))
connector.events.onBuffering(onEvent('buffering'))
connector.events.onBufferChange(onEvent('buffer changed'))
connector.events.onPause(onEvent('paused'))
connector.events.onPlay(onEvent('playing'))
connector.events.onPlaytimeUpdate(onEvent('playtime'))
connector.events.onError(onEvent('error'))
connector.events.onEnd(onEvent('end'))
connector.events.onRateChange(onEvent('rate changed'))
connector.events.onDurationChange(onEvent('duration changed'))
connector.events.onVolumeChange(onEvent('volume changed'))
connector.events.onFilterUpdate(onEvent('filter updated'))
connector.events.onPlaytimeUpdate(value => {
  progressBar.value = value / 250
})

