import 'file-loader?name=index.html!./index.html'

import { audio } from '@podlove/html5-audio-driver'
import { attatchStream } from '@podlove/html5-audio-driver/hls'

import { registerActions } from './src/actions'
import { registerEvents } from './src/events'
import { registerInputs } from './src/inputs'

const sources = [{
  url: 'https://ndr-ndr2-niedersachsen.cast.addradio.de/ndr/ndr2/niedersachsen/mp3/128/stream.mp3',
  mimeType: 'audio/mp3'
}]

const myAudio = attatchStream(audio(sources))

registerEvents(myAudio)
registerActions(myAudio)
registerInputs(myAudio)
