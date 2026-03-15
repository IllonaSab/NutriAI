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
  const [dateSelectee, setDateSelectee] = useState(new Date())
  const prenom = user?.name?.split(' ')[0] || 'toi'
  const dateString = dateSelectee.toISOString().split('T')[0]

  const repasDefaut = [
    { id: 1, nom: 'Petit déj', icon: '/petitdej.png', mange: false },
    { id: 2, nom: 'Déjeuner', icon: '/dejeuner.png', mange: false },
    { id: 3, nom: 'Encas', icon: '/encas.png', mange: false },
    { id: 4, nom: 'Dîner', icon: '/diner.png', mange: false },
  ]

  // Message du jour
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
  }, [])

  // Charger les données du jour
  useEffect(() => {
    if (!user?.id) return
    const chargerJour = async () => {
      try {
        const res = await axios.get(`${config.DB_URL}/users/jour/${user.id}/${dateString}`)
        setHumeur(res.data.humeur)
        setRepas(res.data.repas?.length ? res.data.repas : repasDefaut)
        setEau(res.data.eau || 0)
        setVictoire(res.data.victoire || '')
      } catch {
        setHumeur(null)
        setRepas(repasDefaut)
        setEau(0)
        setVictoire('')
      }
    }
    chargerJour()
  }, [dateString, user])

  // Sauvegarder automatiquement
  const sauvegarder = async (newHumeur, newRepas, newEau, newVictoire) => {
    if (!user?.id) return
    try {
      await axios.post(`${config.DB_URL}/users/jour`, {
        userId: user.id,
        date: dateString,
        humeur: newHumeur,
        repas: newRepas,
        eau: newEau,
        victoire: newVictoire
      })
    } catch (err) {
      console.error('Erreur sauvegarde', err)
    }
  }

  const handleHumeur = (i) => {
    setHumeur(i)
    sauvegarder(i, repas, eau, victoire)
  }

  const handleRepas = (id) => {
    const newRepas = repas.map(x => x.id === id ? { ...x, mange: !x.mange } : x)
    setRepas(newRepas)
    sauvegarder(humeur, newRepas, eau, victoire)
  }

  const handleEau = (i) => {
    const newEau = i < eau ? i : i + 1
    setEau(newEau)
    sauvegarder(humeur, repas, newEau, victoire)
  }

  const handleVictoire = (val) => {
    setVictoire(val)
    sauvegarder(humeur, repas, eau, val)
  }

  return (
    <div style={styles.container}>
      <Header title={`Bonjour ${prenom} 🌸`} />
      <DateNav onDateChange={(d) => setDateSelectee(d)} />

      <div style={styles.scroll}>

        {/* Message */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/butterfly.png" alt="" style={styles.butterfly} />
            <p style={styles.messageText}>{message}</p>
          </div>
        </Card>

        {/* Humeur */}
        <Card title="Comment tu te sens ?">
          <div style={styles.row}>
            {[
              { emoji: '😔', label: 'Difficile' },
              { emoji: '😐', label: 'Neutre' },
              { emoji: '🙂', label: 'Bien' },
              { emoji: '😊', label: 'Super' },
            ].map((e, i) => (
              <div key={i} onClick={() => handleHumeur(i)} style={{
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
              <div key={r.id} onClick={() => handleRepas(r.id)} style={{
                ...styles.item,
                backgroundColor: r.mange ? theme.colors.repasBackground : theme.colors.background,
                border: r.mange ? `2px solid ${theme.colors.repasBorder}` : '2px solid transparent',
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
              <span key={i} onClick={() => handleEau(i)} style={{
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
            onChange={e => handleVictoire(e.target.value)}
          />
        </Card>

      </div>

      {/* Bouton flottant chat */}
      <div style={styles.floatingBtn} onClick={() => navigate('/chat')}>
        <img src="/bulle.png" alt="chat" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
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
    bottom: '24px',
    right: '24px',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: theme.colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(200,168,75,0.5)',
    zIndex: 100,
  },
}

export default Dashboard