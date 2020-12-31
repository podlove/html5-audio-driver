import 'file-loader?name=index.html!./index.html'

import { audio } from '@podlove/html5-audio-driver'
import { attatchStream } from '@podlove/html5-audio-driver/hls'

import { registerActions } from './src/actions'
import { registerEvents } from './src/events'
import { registerInputs } from './src/inputs'

const sources = [{
  url: 'https://mcdn.br.de/br/hf/b5/master.m3u8',
  title: 'HLS Stream',
  mimeType: 'application/x-mpegURL'
}]

const myAudio = attatchStream(audio(sources))

registerEvents(myAudio)
registerActions(myAudio)
registerInputs(myAudio)
