import { curry, compose } from 'ramda'
import { audio } from 'driver'
import { actions } from 'driver/actions'
import { events } from 'driver/events'
import { props } from 'driver/props'

const debug = curry((category, payload) => {
    console.group(category);

    switch (typeof payload) {
        case 'number':
        case 'string':
            console.log('payload: ', payload)
        break
        case 'object':
            Object.keys(payload).map((key) => console.log(`${key}: `, payload[key]))
        break
    }

    console.groupEnd();
})

const myAudio = audio({
    url: 'audio-files/example.m4a',
    mimeType: 'audio/mp4'
}, {
    url: 'audio-files/example.mp3',
    mimeType: 'audio/mp3'
}, {
    url: 'audio-files/example.ogg',
    mimeType: 'audio/ogg'
})

const audioEvents = events(myAudio)
const audioActions = actions(myAudio)

const displayProps = (audio) => input => {
    const element = document.getElementById('props')
    const playerProperties = props(audio)

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    Object.keys(playerProperties).map(key => {
        const propNode = document.createElement('tr')
        propNode.innerHTML = `<td>${key}</td><td>${playerProperties[key]}</td>`
        element.append(propNode)
    })

    return input
}

const onEvent = (event) => compose(displayProps(myAudio))

audioEvents.onLoaded(onEvent('loaded'))
audioEvents.onLoading(onEvent('loading'))
audioEvents.onBuffer(onEvent('buffering'))
audioEvents.onPause(onEvent('paused'))
audioEvents.onPlay(onEvent('playing'))
audioEvents.onTimeUpdate(onEvent('playtime'))
audioEvents.onError(onEvent('error'))
audioEvents.onEnd(onEvent('end'))
audioEvents.onRateChange(onEvent('rate changed'))
audioEvents.onDurationChange(onEvent('duration changed'))
audioEvents.onVolumeChange(onEvent('volume changed'))

// key bindings
const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')
const loadButton = document.getElementById('load')
const restartButton = document.getElementById('restart')

displayProps(audio)()

console.log(audioActions)

loadButton.addEventListener('click', audioActions.load)
playButton.addEventListener('click', audioActions.play)
pauseButton.addEventListener('click', audioActions.pause)
restartButton.addEventListener('click', compose(audioActions.play, () => audioActions.setPlaytime(0), audioActions.pause))
