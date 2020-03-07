import 'file-loader?name=index.html!./index.html'
import m4a from 'file-loader!./audio-files/example.m4a'
import mp3 from 'file-loader!./audio-files/example.mp3'
import ogg from 'file-loader!./audio-files/example.ogg'

import { connect } from '@podlove/html5-audio-driver'
import { registerConnectActions } from './src/actions'

const connector = connect.audio()

connector.load([{
  url: m4a,
  mimeType: 'audio/mp4'
}, {
  url: mp3,
  mimeType: 'audio/mp3'
}, {
  url: ogg,
  mimeType: 'audio/pgg'
}])

registerConnectActions(connector)
