/* global describe it expect sinon beforeEach afterEach */
import { audio } from '@podlove/html5-audio-driver'
import { audioFixture } from 'test/fixtures'
import { testLoader } from 'test/helpers'
import { collectProperties, getNodeFromEvent } from '@podlove/html5-audio-driver/utils'

describe('utils', () => {
  describe('collectProperties', () => {
    it('should be a function', () => {
      expect(typeof collectProperties).to.equal('function')
    })

    it('should return a function', () => {
      expect(typeof collectProperties({ 'foo': 'bar' })).to.equal('function')
    })

    it('should call a list of funciton with a given value', () => {
      const propertySpyA = sinon.spy()
      const propertySpyB = sinon.spy()

      collectProperties({ propertySpyA, propertySpyB })('foo')
      expect(propertySpyA).to.have.been.calledWith('foo')
      expect(propertySpyB).to.have.been.calledWith('foo')
    })
  })

  describe('getNodeFromEvent', () => {
    let audioElement

    beforeEach(() => {
      audioElement = audio(audioFixture)
    })

    afterEach(() => {
      audioElement.remove()
    })

    it('should be a function', () => {
      expect(typeof getNodeFromEvent).to.equal('function')
    })

    it('should extract the audio element from event', (done) => {
      testLoader(audioElement, (target, event) => {
        expect(getNodeFromEvent(event)).to.equal(audioElement)
        done()
      })
    })
  })
})
