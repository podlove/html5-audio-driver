/* globals it */
import * as Smartphone from 'detect-mobile-browser'

const mobile = Smartphone(false)

export const testLoader = (audio, cb) => {
  audio.addEventListener('canplay', (event) => {
    cb(event.target, event)
  }, { once: true })

  audio.load()
}

export const onDesktopIt = mobile.isIOS() || mobile.isAndroid() ? it.skip : it
export const onMobileIt = mobile.isIOS() || mobile.isAndroid() ? it : it.skip
