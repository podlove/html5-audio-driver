import { compose } from 'ramda'

import { channels } from './props'
import { connectBuffer, registerBuffer } from './media-context'

const hasAudioContext = node => {
  if (!node.audioContext || !node.audioBuffer) {
    console.warn(`[html-5-audio-driver]: provided media node doesn't provide the needed audio context`)
    return false
  }

  return true
}

const mono = compose(node => {
  if (!hasAudioContext(node) || channels(node) < 2) {
    return node
  }

  const gainNode = node.audioContext.createGain()

  gainNode.channelCount = 1;
  gainNode.channelCountMode = 'explicit';
  gainNode.channelInterpretation = 'speakers';

  return connectBuffer(gainNode, node)
})

const stereo = compose(node => {
  if (!hasAudioContext(node) || channels(node) > 1) {
    return node
  }

  const gainNode = node.audioContext.createGain()

  gainNode.channelCount = 2;
  gainNode.channelCountMode = 'explicit';
  gainNode.channelInterpretation = 'speakers';

  return connectBuffer(gainNode, node)
})

export {
  mono,
  stereo
}
