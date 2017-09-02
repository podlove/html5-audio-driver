/* global describe it expect beforeEach afterEach */
import { compose } from 'ramda'
import { audio } from 'html5-audio-driver'
import { onPlay } from 'html5-audio-driver/events'
import { actions, setPlaytime, play, pause, load, mute, unmute, setVolume, setRate } from 'html5-audio-driver/actions'
import { duration, playing, muted, volume, rate } from 'html5-audio-driver/props'
import { audioFixture } from 'test/fixtures'
import { testLoader, onDesktopIt } from 'test/helpers'

describe('actions', () => {
  let audioElement

  beforeEach(() => {
    audioElement = audio(audioFixture)
  })

  afterEach(() => {
    audioElement.remove()
  })

  describe('setPlaytime', () => {
    let playtimeSetter
    let playAction

    beforeEach(() => {
      playtimeSetter = setPlaytime(audioElement)
      playAction = play(audioElement)
    })

    it('should be a function', () => {
      expect(typeof setPlaytime).to.equal('function')
    })

    it('should return a function', () => {
      expect(typeof playtimeSetter).to.equal('function')
    })

    it('should set the playtime', () => {
      expect(playtimeSetter(10).playtime).to.equal(10)
    })

    it('should prevent playtimes less than 0', () => {
      expect(playtimeSetter(-10).playtime).to.equal(0)
    })

    it('should prevent playtime larger than duration', done => {
      testLoader(audioElement, compose(done, duration => {
        expect(playtimeSetter(duration + 50).playtime).to.equal(duration)
      }, duration))
    })

    it('should use the playtime on play', done => {
      playtimeSetter(50)
      testLoader(audioElement, compose(done, () => {
        playAction()
        expect(audioElement.playtime).to.be.at.least(50)
        expect(audioElement.currentTime).to.be.at.least(50)
      }, duration))
    })
  })

  describe('play', () => {
    let playAction
    let playEvent

    beforeEach(() => {
      playAction = play(audioElement)
      playEvent = onPlay(audioElement)
    })

    it('should be a function', () => {
      expect(typeof play).to.equal('function')
    })

    it('should return a function', () => {
      expect(typeof playAction).to.equal('function')
    })

    // This test will fail on mobile devices because a direct user interaction is required
    onDesktopIt('should play the audio', done => {
      playEvent(() => {
        done()
      }, { once: true })
      playAction()
    })
  })

  describe('pause', () => {
    let pauseAction
    let playAction

    beforeEach(() => {
      pauseAction = pause(audioElement)
      playAction = play(audioElement)
    })

    it('should be a function', () => {
      expect(typeof pause).to.equal('function')
    })

    it('should return a function', () => {
      expect(typeof pauseAction).to.equal('function')
    })

    onDesktopIt('should pause the audio', done => {
      testLoader(audioElement, () => {
        playAction()
        setTimeout(() => {
          pauseAction()
          expect(playing(audioElement)).to.equal(false)
          done()
        }, 1000)
      })
    })
  })

  describe('load', () => {
    let loadAction

    beforeEach(() => {
      loadAction = load(audioElement)
    })

    it('should be a function', () => {
      expect(typeof load).to.equal('function')
    })

    it('should return a function', () => {
      expect(typeof loadAction).to.equal('function')
    })

    it('should load the audio', done => {
      audioElement.addEventListener('canplay', () => done(), { once: true })
      loadAction()
    })
  })

  describe('mute', () => {
    let muteAction

    beforeEach(() => {
      muteAction = mute(audioElement)
    })

    it('should be a function', () => {
      expect(typeof mute).to.equal('function')
    })

    it('should return a function', () => {
      expect(typeof muteAction).to.equal('function')
    })

    it('mute the audio', done => {
      testLoader(audioElement, () => {
        expect(muted(audioElement)).to.equal(false)
        muteAction()
        expect(muted(audioElement)).to.equal(true)
        done()
      })
    })
  })

  describe('unmute', () => {
    let muteAction
    let unmuteAction

    beforeEach(() => {
      muteAction = mute(audioElement)
      unmuteAction = unmute(audioElement)
    })

    it('should be a function', () => {
      expect(typeof mute).to.equal('function')
    })

    it('should return a function', () => {
      expect(typeof unmuteAction).to.equal('function')
    })

    it('unmute the audio', done => {
      testLoader(audioElement, () => {
        muteAction()
        expect(muted(audioElement)).to.equal(true)
        unmuteAction()
        expect(muted(audioElement)).to.equal(false)
        done()
      })
    })
  })

  // Important: setting volume on mobile is not supported!
  describe('setVolume', () => {
    let setVolumeAction

    beforeEach(() => {
      setVolumeAction = setVolume(audioElement)
    })

    it('should be a function', () => {
      expect(typeof setVolume).to.equal('function')
    })

    it('should return a function', () => {
      expect(typeof setVolumeAction).to.equal('function')
    })

    onDesktopIt('sets the audio volume', done => {
      testLoader(audioElement, () => {
        expect(volume(audioElement)).to.equal(1)
        setVolumeAction(0.5)
        expect(volume(audioElement)).to.equal(0.5)
        done()
      })
    })

    onDesktopIt('should prevent volume less than 0', done => {
      testLoader(audioElement, () => {
        expect(volume(audioElement)).to.equal(1)
        setVolumeAction(-1)
        expect(volume(audioElement)).to.equal(0)
        done()
      })
    })

    onDesktopIt('should prevent volume larger than 1', done => {
      testLoader(audioElement, () => {
        expect(volume(audioElement)).to.equal(1)
        setVolumeAction(2)
        expect(volume(audioElement)).to.equal(1)
        done()
      })
    })
  })

  describe('setRate', () => {
    let setRateAction

    beforeEach(() => {
      setRateAction = setRate(audioElement)
    })

    it('should be a function', () => {
      expect(typeof setRate).to.equal('function')
    })

    it('should return a function', () => {
      expect(typeof setRateAction).to.equal('function')
    })

    it('sets the audio rate', done => {
      testLoader(audioElement, () => {
        expect(rate(audioElement)).to.equal(1)
        setRateAction(0.5)
        expect(rate(audioElement)).to.equal(0.5)
        done()
      })
    })

    it('should prevent rate less than 0.5', done => {
      testLoader(audioElement, () => {
        expect(rate(audioElement)).to.equal(1)
        setRateAction(-1)
        expect(rate(audioElement)).to.equal(0.5)
        done()
      })
    })

    it('should prevent rate larger than 4', done => {
      testLoader(audioElement, () => {
        expect(rate(audioElement)).to.equal(1)
        setRateAction(5)
        expect(rate(audioElement)).to.equal(4)
        done()
      })
    })
  })

  describe('actions', () => {
    let audioActions
    let availableActions

    beforeEach(() => {
      audioActions = actions(audioElement)
      availableActions = Object.keys(audioActions)
    })

    it('should be a function', () => {
      expect(typeof actions).to.equal('function')
    })

    it('should return a object with actions', () => {
      expect(availableActions).to.deep.equal([
        'play',
        'pause',
        'load',
        'setPlaytime',
        'mute',
        'unmute',
        'setVolume',
        'setRate'
      ])
    })

    it('should export an object with functions', () => {
      availableActions.map(action => {
        expect(typeof audioActions[action]).to.equal('function')
      })
    })
  })
})
