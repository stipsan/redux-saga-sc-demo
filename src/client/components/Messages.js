import './Messages.css'

import leftPad from 'left-pad'
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import uikit from 'uikit/dist/css/uikit.almost-flat.css'

import Form from './Form'

const supportSticky = (function () {
    var elem = document.createElement('div');
    elem.style.cssText = 'position:-webkit-sticky';
    if (elem.style.position.match('-webkit-sticky')) return true;
    elem.style.cssText = 'position:sticky';
    if (elem.style.position.match('sticky')) return true;
    return false;
}());

const wrapperStyle = Object.freeze({
  height: '100vh',
  overflow: supportSticky && 'auto',
})

const listStyle = Object.freeze({
  overflow: !supportSticky && 'auto',
  flex: supportSticky && 'none',
  WebkitOverflowScrolling: 'touch',
  marginBottom: '0px',
  boxSizing: 'border-box',
  paddingTop: '15px',
  paddingBottom: '0px',
})

const timeAgoFormatter = (value, unit) => {
  const formattedUnit = 'monh' === unit ? 'M' : unit.slice(0, 1)
  return `${value} ${formattedUnit}`
}

let throttle = false

const Messages = ({
  messages,
  send
}) => (
  <div
    className="uk-flex uk-flex-column uk-flex-space-between"
    style={wrapperStyle}
  >
    <ul ref={(node) => {
      if(node && node.childNodes.length > 0) {
        throttle = setTimeout(() => {
          scrollIntoViewIfNeeded(node.childNodes[node.childNodes.length - 1], false, {
            duration: 150
          })
        }, 10)
      }
    }} className="uk-list uk-list-line uk-margin-left uk-margin-right" style={listStyle}>
      {messages.map(payload => <li key={payload.id}>
        <span
          style={{display: 'inline-block', width: '70px', opacity: .5}}
          title={payload.when.toLocaleString()}
        >
          {leftPad(payload.when.getHours(), 2, 0)}:
          {leftPad(payload.when.getMinutes(), 2, 0)}:
          {leftPad(payload.when.getSeconds(), 2, 0)}
        </span>
        <strong style={{color: payload.color}}>{payload.username} </strong>
        <span>{payload.message}</span>
      </li>)}
    </ul>
    <Form onSubmit={send} />
  </div>
)

export default Messages
