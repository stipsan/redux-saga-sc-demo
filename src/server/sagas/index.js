import { watchEmits, watchRemote } from 'redux-saga-sc'

import { watchExchange } from './exchange'
import { watchMessages } from './messages'

export default function *sagas(socket, exchange) {
  yield [
    watchMessages(socket, exchange),
    watchExchange(socket, exchange),
    watchEmits(socket),
    watchRemote(socket),
  ]
}
