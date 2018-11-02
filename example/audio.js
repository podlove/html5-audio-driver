import 'file-loader?name=index.html!./index.html'
import m4a from 'file-loader!./audio-files/example.m4a'
import mp3 from 'file-loader!./audio-files/example.mp3'
import ogg from 'file-loader!./audio-files/example.ogg'
import stereoFile from 'file-loader!./audio-files/stereo-example.mp3'
import monoFile from 'file-loader!./audio-files/mono-example.mp3'

import { audio } from '@podlove/html5-audio-driver'
import { mono, stereo } from '@podlove/html5-audio-driver/filters'

import { registerActions } from './src/actions'
import { registerEvents } from './src/events'
import { registerInputs } from './src/inputs'
import { registerFilters } from './src/filters'

const myAudio = audio([{
  url: m4a,
  mimeType: 'audio/mp4'
}, {
  url: mp3,
  mimeType: 'audio/mp3'
}, {
  url: ogg,
  mimeType: 'audio/pgg'
}])

const myStereoExample = audio([{
  url: stereoFile,
  mimeType: 'audio/mp3'
}])

const myMonoExample = audio([{
  url: monoFile,
  mimeType: 'audio/mp3'
}])

registerEvents(myMonoExample)
registerActions(myMonoExample)
registerInputs(myMonoExample)
registerFilters(myMonoExample)
