import { curry } from 'ramda'

export const connectBuffer = curry((buffer, node) => {
  node.activeBuffer && node.activeBuffer.disconnect && node.activeBuffer.disconnect()
  node.audioBuffer && node.audioBuffer.disconnect && node.audioBuffer.disconnect()

  node.activeBuffer = buffer

  node.audioBuffer.connect(buffer)
  buffer.connect(node.audioContext.destination)

  return node
})

export const audioContext = node => {
  let webAudioContext

  try {
    webAudioContext = new window.AudioContext()
  } catch (e) {
    console.warn(`[html-5-audio-driver]: can't create the audio context, seems like the browser is not compatible`)
    return node
  }

  const audioBuffer = webAudioContext.createMediaElementSource(node)

  audioBuffer.connect(webAudioContext.destination)

  node.audioContext = webAudioContext
  node.audioBuffer = audioBuffer

  return node
}
