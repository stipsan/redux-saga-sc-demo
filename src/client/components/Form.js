import {Component} from 'react'

export default class Form extends Component {
  state = {
    message: ''
  }

  handleChange = event => this.setState({message: event.target.value})

  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit(this.state.message)
  }

  render() {
    const { onSubmit } = this.props
    const { message } = this.state
    return <form onSubmit={this.handleSubmit}>
      <input type="text" onChange={this.handleChange} value={message} />
    </form>
  }
}
