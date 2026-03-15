import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { useUser } from '../context/UserContext'
import theme from '../theme'
import Header from '../components/Header'
import Input from '../components/Input'
import Card from '../components/Card'
import DateNav from '../components/DateNav'


const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const [humeur, setHumeur] = useState(null)
  const [repas, setRepas] = useState([
   { id: 1, nom: 'Petit déj', icon: '/petitdej.png', mange: false },
   { id: 2, nom: 'Déjeuner', icon: '/dejeuner.png', mange: false },
   { id: 3, nom: 'Encas', icon: '/encas.png', mange: false },
   { id: 4, nom: 'Dîner', icon: '/diner.png', mange: false },
  ])
  const [eau, setEau] = useState(0)
  const [victoire, setVictoire] = useState('')
  const [message, setMessage] = useState('...')
  const prenom = user?.name?.split(' ')[0] || 'toi'

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.post(`${config.IA_URL}/ia/nutrition`, {
          message: `Donne uniquement une phrase courte et douce (max 15 mots) pour encourager quelqu'un dont l'objectif est "${user?.objectif || 'se réconcilier avec la nourriture'}". Réponds UNIQUEMENT avec la phrase.`
        })
        setMessage(res.data.response)
      } catch {
        setMessage('Chaque repas est une nouvelle opportunité de prendre soin de toi 💛')
      }
    }
    fetchMessage()
  }, [user?.objectif])

  return (
    <div style={styles.container}>
      <Header title={`Bonjour ${prenom} 🌸`} />
      

      <div style={styles.scroll}>

        {/* Message */}
       <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
         <img src="/butterfly.png" alt="" style={styles.butterfly} />
        <p style={styles.messageText}>{message}</p>
         <img src="/butterfly.png" alt="" style={styles.butterfly} />
        </div>
       </Card>
       <DateNav onDateChange={(d) => console.log('Date changée :', d)} />
        {/* Humeur */}
        <Card title="Comment tu te sens ?">
          <div style={styles.row}>
            {[
              { emoji: '😔', label: 'Difficile' },
              { emoji: '😐', label: 'Neutre' },
              { emoji: '🙂', label: 'Bien' },
              { emoji: '😊', label: 'Super' },
            ].map((e, i) => (
              <div key={i} onClick={() => setHumeur(i)} style={{
                ...styles.item,
                backgroundColor: humeur === i ? theme.colors.primary : theme.colors.background,
              }}>
                <span style={{ fontSize: '26px' }}>{e.emoji}</span>
                <span style={{
                  fontSize: '10px',
                  color: humeur === i ? theme.colors.surface : theme.colors.textSecondary,
                  fontFamily: theme.fonts.primary,
                }}>{e.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Repas */}
<Card title="Mes repas">
  <div style={styles.row}>
    {repas.map(r => (
      <div key={r.id} onClick={() => setRepas(repas.map(x => x.id === r.id ? { ...x, mange: !x.mange } : x))} style={{
        ...styles.item,
       backgroundColor: r.mange ? theme.colors.repasBackground : theme.colors.background,
       border: r.mange ? `2px solid ${theme.colors.repasBorder}` : '2px solid transparent',
       color: r.mange ? theme.colors.repasText : theme.colors.textSecondary,
      }}>
        <img src={r.icon} alt={r.nom} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
        <span style={{
          fontSize: '10px',
          color: r.mange ? theme.colors.repasText : theme.colors.textSecondary,
          fontFamily: theme.fonts.primary,
        }}>{r.nom}</span>
        {r.mange && <span style={{ fontSize: '12px', color: theme.colors.repasText }}>✓</span>}
      </div>
    ))}
  </div>
</Card>

        {/* Eau */}
        <Card title={`Hydratation 💧 — ${eau}/8`}>
          <div style={styles.row}>
            {[...Array(8)].map((_, i) => (
              <span key={i} onClick={() => setEau(i < eau ? i : i + 1)} style={{
                fontSize: '22px',
                opacity: i < eau ? 1 : 0.2,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                💧
              </span>
            ))}
          </div>
        </Card>

        {/* Victoire */}
        <Card title="🌟 Ma fierté du jour">
          <Input
            placeholder="Une petite victoire à célébrer..."
            value={victoire}
            onChange={e => setVictoire(e.target.value)}
          />
        </Card>

        {/* Chat */}
        <div style={styles.floatingBtn} onClick={() => navigate('/chat')}>
         <img src="/bulle.png" alt="chat" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
        </div>

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
  scroll: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  butterfly: {
  width: '50px',
  height: '50px',
  objectFit: 'contain',
  flexShrink: 0,
},
messageText: {
  fontSize: '14px',
  color: theme.colors.textSecondary,
  fontStyle: 'italic',
  lineHeight: '1.6',
  margin: 0,
  textAlign: 'center',
  flex: 1,
},
  row: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '10px 6px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    minWidth: '60px',
    },
  floatingBtn: {
  position: 'fixed',
  bottom: '22px',
  right: '22px',
  width: '70px',
  height: '70px',
  borderRadius: '50%',
      backgroundColor: theme.colors.border,
  border: `2px solid ${theme.colors.primary}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
},
}

export default Dashboard