import './Messages.css'

import leftPad from 'left-pad'
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import uikit from 'uikit/dist/css/uikit.almost-flat.css'
import Remarkable from 'remarkable'

import Form from './Form'

const md = new Remarkable({
  linkify: true,
  linkTarget: 'new',
})

const supportSticky = (function () {
    var elem = document.createElement('div');
    elem.style.cssText = 'position:-webkit-sticky';
    if (elem.style.position.match('-webkit-sticky')) return true;
    elem.style.cssText = 'position:sticky';
    if (elem.style.position.match('sticky')) return true;
    return false;
}());

const wrapperStyle = Object.freeze({
  height: !supportSticky && '100vh',
})

const listStyle = Object.freeze({
  overflow: !supportSticky && 'auto',
  WebkitOverflowScrolling: 'touch',
  marginBottom: '0px',
  boxSizing: 'border-box',
  paddingTop: '15px',
  paddingBottom: '0px',
  minHeight: supportSticky && '100vh',
})

const timeAgoFormatter = (value, unit) => {
  const formattedUnit = 'monh' === unit ? 'M' : unit.slice(0, 1)
  return `${value} ${formattedUnit}`
}

let throttle = false

let listClassName = 'uk-list uk-list-line uk-margin-left uk-margin-right'
if(supportSticky) {
  listClassName += ' uk-flex-item-none'
}

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
    }} className={listClassName} style={listStyle}>
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
        <span dangerouslySetInnerHTML={{__html: md.render(payload.message)}} />
      </li>)}
    </ul>
    <Form onSubmit={send} />
  </div>
)

export default Messages
