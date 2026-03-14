import { useState, useRef, useEffect } from 'react'
import { FiSend } from 'react-icons/fi'
import axios from 'axios'
import theme from '../theme'

import ChatMessage from '../components/ChatMessage'
import Header from '../components/Header'


const Chat = () => {
  const [messages, setMessages] = useState([
    { from: 'chat', text: 'Bonjour ! Je suis ton assistant NutriAI. Comment puis-je t\'aider ?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { from: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await axios.post(`${process.env.REACT_APP_IA_URL}/ia/nutrition`, {
        message: input
      })
      const botMessage = { from: 'chat', text: res.data.response }
      setMessages(prev => [...prev, botMessage])
    } catch (err) {
      setMessages(prev => [...prev, {
        from: 'chat',
        text: 'Désolé, une erreur est survenue. Réessaie !'
      }])
    }

    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <Header title="Bienvenue Illona" />


      {/* Messages */}
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {loading && (
          <div style={styles.loading}>NutriAI réfléchit...</div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          placeholder="Écrire ici..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button style={styles.sendBtn} onClick={sendMessage}>
          <FiSend size={20} color="#fff" />
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: theme.colors.background,
  fontFamily: theme.fonts.primary,
},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: `1px solid ${theme.colors.border}`
  },
  logo: {
    width: '36px',
    height: '36px'
  },
  title: {
    fontSize: '18px',
    color: '#3B2A1A',
    margin: 0
  },
  avatar: {
    fontSize: '24px'
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  loading: {
    color: '#9E8A6E',
    fontStyle: 'italic',
    fontSize: '14px',
    textAlign: 'center'
  },
  inputContainer: {
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.spacing.md} ${theme.spacing.md}`,
  borderTop: `1px solid ${theme.colors.border}`,
  gap: theme.spacing.sm,
  backgroundColor: theme.colors.background,
  position: 'sticky',
  bottom: 0,
},
  input: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '24px',
    border: '1px solid #C8B89A',
    backgroundColor: '#FFF',
    fontSize: '15px',
    outline: 'none',
    color: '#3B2A1A'
  },
  sendBtn: {
    backgroundColor: '#D4AF37',
    border: 'none',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }
}

export default Chat