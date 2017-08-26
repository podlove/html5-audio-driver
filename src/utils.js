import { path } from 'ramda'

const collectProperties = (props = {}) => podcast =>
    Object.keys(props).reduce((result, name) =>
        Object.assign({}, result, { [name]: props[name](podcast) })
    , {})

const getAudioFromEvent = path(['target'])
const getAudiError = path(['error', 'code'])

export {
    collectProperties,
    getAudioFromEvent,
    getAudioError
}
