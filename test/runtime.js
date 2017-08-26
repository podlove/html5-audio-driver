// Test Framework
import 'mocha/mocha'
import sinon from 'sinon/lib/sinon'
import chai from 'chai/chai'
import sinonChai from 'sinon-chai/lib/sinon-chai'

// Styles
import 'mocha/mocha.css'

chai.use(sinonChai)
window.expect = chai.expect
window.sinon = sinon
