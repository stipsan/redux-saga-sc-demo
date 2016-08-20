import { cps, take } from 'redux-saga/effects'

function sumChars(str) {
  let sum = 0;
  for(let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

const defaultColors = [
  '#16a085',
  '#1abc9c',
  '#27ae60',
  '#2980b9',
  '#2c3e50',
  '#2ecc71',
  '#34495e',
  '#3498db',
  '#7f8c8d',
  '#8e44ad',
  '#9b59b6',
  '#c0392b',
  '#d35400',
  '#e67e22',
  '#e74c3c',
  '#f1c40f',
  '#f39c12',
]

export function *watchMessages(socket, exchange) {
  while (true) { // eslint-disable-line no-constant-condition
    const message = yield take('MESSAGE')
    if(message.payload.username === 'emoji' && message.payload.message === 'flags') {
      const flags = [
        '🇦🇫🇦🇽🇦🇱🇩🇿',
        '🇦🇸🇦🇩🇦🇴🇦🇮',
        '🇦🇶🇦🇬🇦🇷🇦🇲',
        '🇦🇼🇦🇺🇦🇹🇦🇿',
        '🇧🇸🇧🇭🇧🇩🇧🇧',
        '🇧🇾🇧🇪🇧🇿🇧🇯',
        '🇧🇲🇧🇹🇧🇴🇧🇶',
        '🇧🇦🇧🇼🇧🇷🇮🇴',
        '🇻🇬🇧🇳🇧🇬🇧🇫',
        '🇧🇮🇨🇻🇰🇭🇨🇲',
        '🇨🇦🇮🇨🇰🇾🇨🇫',
        '🇹🇩🇨🇱🇨🇳🇨🇽',
        '🇨🇨🇨🇴🇰🇲🇨🇬',
        '🇨🇩🇨🇰🇨🇷🇭🇷',
        '🇨🇺🇨🇼🇨🇾🇨🇿',
        '🇩🇰🇩🇯🇩🇲🇩🇴',
        '🇪🇨🇪🇬🇸🇻🇬🇶',
        '🇪🇷🇪🇪🇪🇹🇪🇺',
        '🇫🇰🇫🇴🇫🇯🇫🇮',
        '🇫🇷🇬🇫🇵🇫🇹🇫',
        '🇬🇦🇬🇲🇬🇪🇩🇪',
        '🇬🇭🇬🇮🇬🇷🇬🇱',
        '🇬🇩🇬🇵🇬🇺🇬🇹',
        '🇬🇬🇬🇳🇬🇼🇬🇾',
        '🇭🇹🇭🇳🇭🇰🇭🇺',
        '🇮🇸🇮🇳🇮🇩🇮🇷',
        '🇮🇶🇮🇪🇮🇲🇮🇱',
        '🇮🇹🇨🇮🇯🇲🇯🇵',
        '🇯🇪🇯🇴🇰🇿🇰🇪',
        '🇰🇮🇽🇰🇰🇼🇰🇬'
      ]
      for(let flag of flags) {
        const message = {
          type: 'MESSAGE',
          payload: {
            id: new Date + Math.random(),
            when: new Date,
            username: '😁',
            message: flag
          }
        }
        exchange.add('messages', message)
        exchange.publish('chat', message)
      }
    } else {
      message.payload.id = new Date + Math.random()
      message.payload.when = new Date
      message.payload.color = defaultColors[sumChars(socket.id) % defaultColors.length]
      exchange.add('messages', message)
      exchange.publish('chat', message)
    }
  }
}
