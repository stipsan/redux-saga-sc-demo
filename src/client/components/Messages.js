import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import uikit from 'uikit/dist/css/uikit.css'
import TimeAgo from 'react-timeago'

import Form from './Form'

const style = Object.freeze({
  overflow: 'auto',
  marginBottom: '45px',
  boxSizing: 'border-box',
  position: 'absolute',
  left: '15px',
  right: '15px',
  bottom: '0px',
  top: '0px',
  paddingTop: '15px',
  paddingBottom: '15px',
})

const timeAgoFormatter = (value, unit) => {
  const formattedUnit = 'monh' === unit ? 'M' : unit.slice(0, 1)
  return `${value} ${formattedUnit}`
}

let throttle = false

const Messages = ({
  messages,
  send
}) => <div className={uikit('uk-margin-left uk-margin-right')}>
  <ul ref={(node) => {
    console.log('ref', node)
    if(node && node.childNodes.length > 0) {
      throttle = setTimeout(() => {
        scrollIntoViewIfNeeded(node.childNodes[node.childNodes.length - 1], false, {
          duration: 150
        })
      }, 10)
    }
  }} className={uikit('uk-list', 'uk-list-line')} style={style}>
    {messages.map(payload => <li key={payload.id || new Date}>
      <span style={{display: 'inline-block', width: '50px'}}>
        <TimeAgo date={payload.id} formatter={timeAgoFormatter} />
      </span>
      <strong>{payload.username} </strong>
      <span>{payload.message}</span>
    </li>)}
    <li key="bottom-spacer" />
  </ul>
  <Form onSubmit={send} uikit={uikit} />
</div>

export default Messages
