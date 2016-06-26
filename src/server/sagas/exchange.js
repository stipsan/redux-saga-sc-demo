import { socketEmit, createChannelSubscription } from 'redux-saga-sc'
import { call, cps, take, put } from 'redux-saga/effects'

export function *watchExchange(socket, exchange) {
  const chan = yield call(createChannelSubscription, exchange, 'chat')

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
