import {Component} from 'react'
import {Button} from 'uikit-react'

const supportWebkitSticky = (function () {
    var elem = document.createElement('div');
    elem.style.cssText = 'position:-webkit-sticky';
    if (elem.style.position.match('-webkit-sticky')) return true;
    return false;
}());
const supportWebkitBackdropFilter = (function () {
    var elem = document.createElement('div');
    elem.style.cssText = 'position:-webkit-backdrop-filter';
    if (elem.style.position.match('-webkit-backdrop-filter')) return true;
    return false;
}());

// we're freezing it to unlock more react optimizations
const style = Object.freeze({
  boxShadow: '#dddddd 0 -1px 0px',
  paddingTop: '10px',
  paddingBottom: '5px',
  background: supportWebkitBackdropFilter ? 'rgba(255, 255, 255, 0.5)' : 'white',
  WebkitBackdropFilter: 'blur(15px) saturate(300%)',
  bottom: '0px',
  position: supportWebkitSticky && '-webkit-sticky' || 'sticky',
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
      this.props.onSubmit(this.state.message, this.state.username.trim() ? this.state.username : 'anon' )
      this.setState({message: ''})
    }
  }

  render() {
    const { onSubmit } = this.props
    const { message, username } = this.state
    return <form className="uk-form uk-flex-item-none" onSubmit={this.handleSubmit} style={style}>
      <div className="uk-flex uk-flex-wrap uk-margin-left uk-margin-right">
        <div className="uk-flex-item-none uk-margin-small-bottom uk-margin-small-left uk-margin-small-right">
          <input
            className="uk-form-blank uk-form-large uk-text-right"
            placeholder="anon"
            type="text"
            onChange={this.handleNameChange}
            value={username}
            size={Math.max(4, username.length)}
            maxLength={20}
          />
        </div>
        <div className="uk-flex-item-auto uk-margin-small-bottom uk-margin-small-left uk-margin-small-right">
          <input
            className="uk-width-1-1 uk-margin-small uk-form-large"
            placeholder="Type your chat message"
            type="text"
            onChange={this.handleChange}
            value={message}
            maxLength={600}
            autoFocus
          />

        </div>
        <div className="uk-margin-small-bottom uk-margin-small-left uk-margin-small-right">
          <Button large type="submit" primary disabled={!message.trim().length}>
            Send
          </Button>
        </div>
      </div>
    </form>
  }
}
