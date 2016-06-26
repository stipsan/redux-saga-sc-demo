import { cps, take } from 'redux-saga/effects'

export function *watchMessages(exchange) {
  while (true) { // eslint-disable-line no-constant-condition
    const message = yield take('MESSAGE')
    message.payload.id = new Date
    exchange.add('messages', message)
    console.log('added message', message)
    yield cps([exchange, exchange.publish], 'chat', message)
  }
}
