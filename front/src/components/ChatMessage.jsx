import ReactMarkdown from 'react-markdown'

const ChatMessage = ({ message }) => {
  const isUser = message.from === 'user'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isUser ? 'flex-end' : 'flex-start',
      gap: '4px'
    }}>
      <div style={{
        backgroundColor: isUser ? '#D4AF37' : '#FDF6EC',
        color: isUser ? '#FFFFFF' : '#5A3D21',
        padding: '12px 16px',
        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        maxWidth: '75%',
        fontSize: '15px',
        lineHeight: '1.5',
        border: isUser ? '1px solid #E8DCC8' : 'none'
      }}>
        <ReactMarkdown>{message.text}</ReactMarkdown>
      </div>
      <span style={{
        fontSize: '12px',
        color: '#9E8A6E'
      }}>
        {isUser ? 'Users' : 'Chat'}
      </span>
    </div>
  )
}

export default ChatMessage