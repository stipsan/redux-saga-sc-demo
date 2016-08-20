
export const messages = (state = [], action) => {
  switch (action.type) {
  case 'MESSAGE':
    return [...state, {
      id: new Date,
      ...action.payload,
      when: new Date(action.payload.when)
    }]
  default:
    return state
  }
}
