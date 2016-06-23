import { buffers, eventChannel } from 'redux-saga'
import { call, cps, take, put } from 'redux-saga/effects'
import { socketEmit } from 'redux-saga-sc'

function createEventChannel(exchange) {
  return eventChannel(listener => {
    const handleEvent = (action, cb) => {
      // notify the client that the request is received
      if (typeof cb === 'function') {
        cb()
      }
      listener(action)
    }
    const channel = exchange.subscribe('chat')
    channel.watch(handleEvent)

    return () => channel.unwatch('chat', handleEvent)
  }, buffers.fixed())
}

export function *watchExchange(socket, exchange) {
  const chan = yield call(createEventChannel, exchange)

  const messages = yield cps([exchange, exchange.get], 'messages')
  const messagesTotal = messages.length
  for(let i = 0; i < messagesTotal; i++) {
    const message = messages[i]
    yield put(socketEmit(message))
  }

  while (true) { // eslint-disable-line
    const action = yield take(chan)
    yield put(socketEmit(action))
  }
}
