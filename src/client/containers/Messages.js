import { connect } from 'react-redux'
import { socketEmit } from 'redux-saga-sc'

import Messages from '../components/Messages'

const mapStateToProps = state => ({
  messages: state.messages,
})

const mapDispatchToProps = dispatch => ({
  send: (message, username) => dispatch(socketEmit({
    type: 'MESSAGE',
    payload: {message, username}
  })),
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
