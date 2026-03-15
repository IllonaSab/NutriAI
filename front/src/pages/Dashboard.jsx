import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Header from '../components/Header'
import Button from '../components/Button'
import Input from '../components/Input'
import theme from '../theme'
import axios from 'axios'
import config from '../config'

const emojis = ['😔', '😕', '😐', '🙂', '😊']

const repasInitiaux = [
  { id: 1, nom: 'Petit déjeuner', mange: false },
  { id: 2, nom: 'Déjeuner', mange: false },
  { id: 3, nom: 'Encas', mange: false },
  { id: 4, nom: 'Dîner', mange: false },
]

const Dashboard = () => {
  const navigate = useNavigate()
  const [humeur, setHumeur] = useState(null)
  const [repas, setRepas] = useState(repasInitiaux)
  const [eau, setEau] = useState(0)
  const [victoire, setVictoire] = useState('')
  const [message, setMessage] = useState('Chargement de ton message du jour...')

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.post(`${config.IA_URL}/ia/nutrition`, {
          message: 'Réponds avec UNE SEULE phrase courte et douce (max 15 mots). Pas de titre, pas de liste, juste une phrase encourageante sur le rapport à la nourriture.'
        })
        setMessage(res.data.response)
      } catch {
        setMessage('Chaque repas est une nouvelle opportunité de prendre soin de toi. 💛')
      }
    }
    fetchMessage()
  }, [])

  const toggleRepas = (id) => {
    setRepas(repas.map(r => r.id === id ? { ...r, mange: !r.mange } : r))
  }

  return (
    <div style={styles.container}>
      <Header title="Bienvenue Illona" />

      <div style={styles.content}>

        {/* Message du jour */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>💛 Message du jour</p>
          <ReactMarkdown style={styles.messageText}>{message}</ReactMarkdown>
        </div>

        {/* Humeur */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Comment tu te sens ?</p>
          <div style={styles.emojiRow}>
            {emojis.map((emoji, i) => (
              <button
                key={i}
                style={{
                  ...styles.emojiBtn,
                  backgroundColor: humeur === i ? theme.colors.primary : 'transparent',
                  transform: humeur === i ? 'scale(1.3)' : 'scale(1)',
                }}
                onClick={() => setHumeur(i)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Repas */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Mes repas d'aujourd'hui</p>
          {repas.map(r => (
            <div key={r.id} style={styles.repasRow}>
              <button
                style={{
                  ...styles.checkbox,
                  backgroundColor: r.mange ? theme.colors.primary : 'transparent',
                  borderColor: r.mange ? theme.colors.primary : theme.colors.inputBorder,
                }}
                onClick={() => toggleRepas(r.id)}
              >
                {r.mange ? '✓' : ''}
              </button>
              <span style={{
                ...styles.repasLabel,
                textDecoration: r.mange ? 'line-through' : 'none',
                color: r.mange ? theme.colors.textSecondary : theme.colors.textPrimary,
              }}>
                {r.nom}
              </span>
            </div>
          ))}
        </div>

        {/* Eau */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Mon eau</p>
          <div style={styles.eauRow}>
            {[...Array(8)].map((_, i) => (
              <button
                key={i}
                style={{
                  ...styles.eauBtn,
                  opacity: i < eau ? 1 : 0.3,
                }}
                onClick={() => setEau(i < eau ? i : i + 1)}
              >
                🥤
              </button>
            ))}
          </div>
          <p style={styles.eauText}>{eau} verre{eau > 1 ? 's' : ''} / 8</p>
        </div>

        {/* Victoire */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>🌟 Ma victoire du jour</p>
          <Input
  placeholder="Note une petite fierté..."
  value={victoire}
  onChange={e => setVictoire(e.target.value)}
/>
        </div>

        {/* Bouton Chat IA */}
        <Button 
  label="💬 Parler à mon assistant NutriAI" 
  onClick={() => navigate('/chat')} 
  variant="primary" 
/>

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
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    overflowY: 'auto',
    flex: 1,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    border: `1px solid ${theme.colors.border}`,
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: '500',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.sm,
  },
  messageText: {
    fontSize: '14px',
    color: theme.colors.textSecondary,
    lineHeight: '1.6',
    fontStyle: 'italic',
  },
  emojiRow: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing.sm,
  },
  emojiBtn: {
    fontSize: '28px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: theme.borderRadius.round,
    padding: theme.spacing.xs,
    transition: 'transform 0.2s',
  },
  repasRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: `${theme.spacing.sm} 0`,
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  checkbox: {
    width: '24px',
    height: '24px',
    borderRadius: '6px',
    border: `2px solid ${theme.colors.inputBorder}`,
    cursor: 'pointer',
    fontSize: '14px',
    color: theme.colors.textLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  repasLabel: {
    fontSize: '15px',
  },
  eauRow: {
    display: 'flex',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
    marginTop: theme.spacing.sm,
  },
  eauBtn: {
    fontSize: '24px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  eauText: {
    fontSize: '13px',
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
}

export default Dashboard