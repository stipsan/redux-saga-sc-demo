import { cps, take, put } from 'redux-saga/effects'

export function *watchMessages(exchange) {
  while (true) { // eslint-disable-line no-constant-condition
    const message = yield take('MESSAGE')
    message.payload.id = new Date
    exchange.add('messages', message)
    yield cps([exchange, exchange.publish], 'chat', message)
  }
}
