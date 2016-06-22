import { watchEmits, watchRemote, watchRequests } from 'redux-saga-sc'

// the 'socketcluster-client' package throws an exception if WebSocket does not exist
const socketCluster = global.WebSocket ? require('socketcluster-client') : false

const socket = socketCluster && socketCluster.connect({
  hostname: process.env.SOCKET_HOSTNAME || location.hostname,
  autoReconnect: true,
  autoReconnectOptions: process.env.AUTO_RECONNECT_OPTIONS,
  ackTimeout: 10000, // server should never take this long to ping back
})

export default function *sagas() {
  yield [
    watchRemote(socket),
    watchRequests(socket),
    watchEmits(socket),
  ]
}
