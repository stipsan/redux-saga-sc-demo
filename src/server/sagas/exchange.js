import { socketEmit, createChannelSubscription } from 'redux-saga-sc'
import { call, cps, take, put, fork } from 'redux-saga/effects'

function *emit(action) {
  try {
    yield put(socketEmit(action))
  } catch(error) {
    console.error('Caught during socketEmit', error)
  }
}

export function *watchExchange(socket, exchange) {
  const chan = yield call(createChannelSubscription, exchange, 'chat')

  // prevent memory leaks
  socket.on('disconnect', () => chan.close())

  const messages = yield cps([exchange, exchange.get], 'messages')
  const messagesTotal = messages.length
  for(let i = 0; i < messagesTotal; i++) {
    const message = messages[i]
    try {
      yield put(socketEmit(message))
    } catch(error) {
      console.error('Caught during socketEmit', error)
    }
  }

  while (true) { // eslint-disable-line
    const action = yield take(chan)
    yield fork(emit, action)
  }
}
