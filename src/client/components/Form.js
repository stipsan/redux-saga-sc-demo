import {Component} from 'react'
import {Button, Input} from 'uikit-react'

const supportWebkitSticky = (function () {
    var elem = document.createElement('div');
    elem.style.cssText = 'position:-webkit-sticky';
    if (elem.style.position.match('-webkit-sticky')) return true;
    return false;
}());
const supportWebkitBackdropFilter = (function () {
    var elem = document.createElement('div');
    elem.style.cssText = '-webkit-backdrop-filter:blur(1px)';
    if (elem.style.webkitBackdropFilter) return true;
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
          <Input
            blank
            className="uk-text-right"
            large
            maxLength={20}
            onChange={this.handleNameChange}
            placeholder="anon"
            size={Math.max(4, username.length)}
            type="text"
            value={username}
          />
        </div>
        <div className="uk-flex-item-auto uk-margin-small-bottom uk-margin-small-left uk-margin-small-right">
          <Input
            autoFocus
            className="uk-margin-small"
            large
            maxLength={600}
            onChange={this.handleChange}
            placeholder="Type your chat message"
            value={message}
            width="full"
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
