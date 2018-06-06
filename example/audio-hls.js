import 'file-loader?name=index.html!./index.html'

import { audio } from '@podlove/html5-audio-driver'

import { registerActions } from './src/actions'
import { registerEvents } from './src/events'
import { registerInputs } from './src/inputs'

const myAudio = audio({
  url: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s-fmp4/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
  mimeType: 'application/x-mpegURL'
})

registerEvents(myAudio)
registerActions(myAudio)
registerInputs(myAudio)

