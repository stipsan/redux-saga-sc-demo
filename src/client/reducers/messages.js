
export const messages = (state = [], action) => {
  switch (action.type) {
  case 'MESSAGE':
    return [...state, action.payload.message]
  default:
    return state
  }
}
