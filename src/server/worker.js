import compression from 'compression'
import express from 'express'

import createStore from './store'

export const run = worker => {
  const app = express()

  // We are on Heroku after all, behind load balancers
  // and want our https and wss to work properly with the IPs
  app.enable('trust proxy')

  app.use(compression())

  app.use(express.static('public', { maxAge: 86400000 * 365, index: false }))
  app.use(express.static('public', { index: 'index.html' }))

  worker.httpServer.on('request', app)

  const exchange = worker.exchange
  exchange.get('messages', (err, messages) => {
    if(messages === undefined) {
      exchange.set('messages', [
        {
          message: 'Welcome to the demo!',
          username: 'redux-saga-sc-demo'
        },
        {
          color: 'teal',
          message: 'You can check the sourcecode on [GitHub](https://github.com/stipsan/redux-saga-sc-demo).',
          username: 'stipsan'
        }
      ].map(message => ({type: 'MESSAGE', payload: {
        ...message, id: new Date + Math.random(), when: new Date
      }})))
    }
  })
  worker.scServer.on('connection', socket => createStore(socket, exchange))
}
