
export const messages = (state = [], action) => {
  switch (action.type) {
  case 'MESSAGE':
    return [...state, action.payload]
  default:
    return state
  }
}
