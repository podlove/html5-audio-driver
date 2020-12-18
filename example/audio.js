import 'file-loader?name=index.html!./index.html'
import m4a from 'file-loader!./audio-files/example.m4a'
import mp3 from 'file-loader!./audio-files/example.mp3'
import ogg from 'file-loader!./audio-files/example.ogg'

import { audio } from '@podlove/html5-audio-driver'

import { registerActions } from './src/actions'
import { registerEvents } from './src/events'
import { registerInputs } from './src/inputs'
import { registerFilters } from './src/filters'

const myAudio = audio([
//   {
//   url: m4a,
//   mimeType: 'audio/mp4'
// },
{
  url: 'https://ndr-ndr2-niedersachsen.cast.addradio.de/ndr/ndr2/niedersachsen/mp3/128/stream.mp3',
  mimeType: 'audio/mp3'
}
// {
//   url: ogg,
//   mimeType: 'audio/pgg'
// }
])

registerEvents(myAudio)
registerActions(myAudio)
registerInputs(myAudio)
registerFilters(myAudio)
