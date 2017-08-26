/* globals it */
import * as Smartphone from 'detect-mobile-browser'

export const testLoader = (audio, cb) => {
  audio.addEventListener('canplay', (event) => {
    cb(event.target, event)
  }, { once: true })

  audio.load()
}

export const onDesktopIt = Smartphone(false).isIOS() || Smartphone(false).isAndroid() ? it.skip : it
export const onSmartphoneIt = Smartphone(true).isIOS() || Smartphone(true).isAndroid() ? it.skip : it
