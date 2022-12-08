import { props } from '../../src'

// Props display
export const renderProps = (audio) => input => {
  const element = document.getElementById('props')
  const playerProperties = props(audio)

  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }

  Object.keys(playerProperties).map(key => {
    const propNode = document.createElement('tr')
    propNode.innerHTML = `<td>${key}</td><td>${playerProperties[key]}</td>`
    element.appendChild(propNode)
  })

  return input
}
