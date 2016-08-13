import {Component} from 'react'
import {Button} from 'uikit-react'

// we're freezing it to unlock more react optimizations
const style = Object.freeze({
  position: 'fixed',
  left: '15px',
  right: '15px',
  boxShadow: '#dddddd 0 -1px 0px',
  paddingTop: '10px',
  background: 'white',
  paddingBottom: '10px',
  bottom: '0px',
})

export default class Form extends Component {
  state = {
    username: 'anon',
    message: ''
  }

  handleChange = event => this.setState({message: event.target.value})

  handleNameChange = event => this.setState({username: event.target.value})

  handleSubmit = event => {
    event.preventDefault()
    if(this.state.message.trim().length > 0) {
      this.props.onSubmit(this.state.message, this.state.username)
      this.setState({message: ''})
    }
  }

  render() {
    const { onSubmit } = this.props
    const { message, username } = this.state
    return <form className="uk-form" onSubmit={this.handleSubmit} style={style}>
      <div className="uk-flex">
        <div className="uk-flex-item-none">
          <input
            className="uk-form-width-small uk-margin-small-right"
            placeholder="anon"
            type="text"
            onChange={this.handleNameChange}
            value={username}
            maxLength={20}
          />
        </div>
        <div className="uk-flex-item-auto">
          <input
            className="uk-width-1-1"
            placeholder="Type your chat message"
            type="text"
            onChange={this.handleChange}
            value={message}
            maxLength={600}
          />

        </div>
        <div>
          <Button className="uk-margin-small-left" type="submit" primary disabled={!message.trim().length}>
            Send
          </Button>
        </div>
      </div>
    </form>
  }
}
