const path = require('path')
const SocketCluster = require('socketcluster').SocketCluster
console.log('resolve', require.resolve('uikit'))
new SocketCluster({
  // depending on the Heroku dyno this may vary
  workers: Number(process.env.WEB_CONCURRENCY) || 1,
  // heroku sets the port used on the intranet
  port: process.env.PORT || 5000,
  // everything goes through redux stores
  allowClientPublish: false,
  // generated automatically if using the Heroku deploy button
  authKey: process.env.AUTH_KEY,
  // this process respawns automatically on crash
  workerController: path.resolve(__dirname, 'worker.js'),
})
