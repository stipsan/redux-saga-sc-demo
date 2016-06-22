import { take } from 'redux-saga/effects'

export function *watchMessages() {
  while (true) { // eslint-disable-line no-constant-condition
    const message = yield take('MESSAGE')
    console.log(message)
  }
}
