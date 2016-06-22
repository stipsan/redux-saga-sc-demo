import { watchEmits, watchRemote } from 'redux-saga-sc'

import { watchMessages } from './messages'

export default function *sagas(socket) {
  yield [
    watchMessages(),
    watchEmits(socket),
    watchRemote(socket),
  ]
}
