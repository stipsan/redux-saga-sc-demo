import { PropTypes } from 'react'
import { Provider } from 'react-redux'

import Messages from './Messages'

const Root = ({ store }) => {

  return <Provider store={store}>
    <Messages />
  </Provider>
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
