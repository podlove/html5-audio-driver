export const audioLoader = (audio, cb) => {
  audio.addEventListener('canplay', (event) => {
    cb(event.target, event)
  }, { once: true })
  audio.load()
}
