import { delay } from 'redux-saga'
import { take, put } from 'redux-saga/effects'
import { socketEmit } from 'redux-saga-sc'

export function *watchMessages() {
  while (true) { // eslint-disable-line no-constant-condition
    const message = yield take('MESSAGE')
    yield put(socketEmit(message))
  }
}
