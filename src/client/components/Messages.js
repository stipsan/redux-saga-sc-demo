
import Form from './Form'

const Messages = ({
  messages,
  send
}) => <div>
  <ul>
    {messages.map(message => <li>
      {message}
    </li>)}
  </ul>
  <Form onSubmit={send} />
</div>

export default Messages
