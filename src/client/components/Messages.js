import 'react-virtualized/styles.css';

import './Messages.css'

import leftPad from 'left-pad'
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import uikit from 'uikit/dist/css/uikit.almost-flat.css'
import Remarkable from 'remarkable'
import { Component } from 'react'
import { AutoSizer, CellMeasurer, VirtualScroll } from 'react-virtualized'

import Form from './Form'

const md = new Remarkable({
  linkify: true,
  linkTarget: 'new',
})

const wrapperStyle = Object.freeze({
  height: '100vh',
})

const timeAgoFormatter = (value, unit) => {
  const formattedUnit = 'monh' === unit ? 'M' : unit.slice(0, 1)
  return `${value} ${formattedUnit}`
}

let throttle = false

export default class Messages extends Component {
  renderMessage = ({ index }) => {
    const payload = this.props.messages[index]

    return (
      <div className="tm-message">
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
      </div>
    )
  }
  renderCell = ({ rowIndex }) => {
    return this.renderMessage({index: rowIndex})
  }
  render() {
    const {messages, send} = this.props
    const {renderCell, renderMessage} = this
    console.log(messages, messages.length)
    return (
      <div className="uk-flex uk-flex-column uk-flex-space-between" style={wrapperStyle}>
        <div className="uk-flex-item-auto uk-margin-left uk-margin-right">
          <AutoSizer>
            {({ height, width }) => (
              <CellMeasurer
                cellRenderer={renderCell}
                columnCount={1}
                rowCount={messages.length}
                width={width}
              >
                {({ getRowHeight }) => (
                  <VirtualScroll
                    height={height}
                    rowHeight={getRowHeight}
                    rowCount={messages.length}
                    rows={messages}
                    rowRenderer={renderMessage}
                    scrollToIndex={Math.max(0, messages.length - 1)}
                    width={width}
                  />
                )}
              </CellMeasurer>
            )}
          </AutoSizer>
        </div>
        <Form onSubmit={send} />
      </div>
    )
  }
}
