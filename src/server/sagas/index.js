import { watchRemote } from 'redux-saga-sc'

/*
import {
  watchMessages,
  watchViewer,
} from './exports'
//*/

export default function *sagas(socket, database, redis) {
  yield [
    //watchViewer(),
    //watchMessages(),
    watchRemote(socket)
  ]
}
