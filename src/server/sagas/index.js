import { watchEmits, watchRemote } from 'redux-saga-sc'

import { watchMessages } from './messages'
import { watchExchange } from './exchange'

export default function *sagas(socket, exchange) {
  yield [
    watchMessages(exchange),
    watchExchange(socket, exchange),
    watchEmits(socket),
    watchRemote(socket),
  ]
}
