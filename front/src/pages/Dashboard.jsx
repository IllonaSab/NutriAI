import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { useUser } from '../context/UserContext'
import theme from '../theme'
import Header from '../components/Header'
import Input from '../components/Input'
import { ButtonValid } from '../components/Button'
import Card from '../components/Card'
import DateNav from '../components/DateNav'
import EmojiPicker from '../components/EmojiPicker'
import WaterTracker from '../components/WaterTracker'

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
  const [victoires, setVictoires] = useState([])
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

  useEffect(() => {
    if (!user?.id) return
    const chargerJour = async () => {
      try {
        const res = await axios.get(`${config.DB_URL}/users/jour/${user.id}/${dateString}`)
        setHumeur(res.data.humeur)
        setRepas(res.data.repas?.length ? res.data.repas : repasDefaut)
        setEau(res.data.eau || 0)
        const v = res.data.victoire || ''
        setVictoires(v ? v.split('|') : [])
      } catch {
        setHumeur(null)
        setRepas(repasDefaut)
        setEau(0)
        setVictoires([])
      }
    }
    chargerJour()
  }, [dateString, user])

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
    sauvegarder(i, repas, eau, victoires.join('|'))
  }

  const handleRepas = (id) => {
    const newRepas = repas.map(x => x.id === id ? { ...x, mange: !x.mange } : x)
    setRepas(newRepas)
    sauvegarder(humeur, newRepas, eau, victoires.join('|'))
  }

  const handleEau = (i) => {
    const newEau = i < eau ? i : i + 1
    setEau(newEau)
    sauvegarder(humeur, repas, newEau, victoires.join('|'))
  }

  const handleAjouterVictoire = () => {
    if (!victoire.trim()) return
    const newVictoires = [...victoires, victoire]
    setVictoires(newVictoires)
    setVictoire('')
    sauvegarder(humeur, repas, eau, newVictoires.join('|'))
  }

  return (
    <div style={styles.container}>
      <Header title={`Bonjour ${prenom} 🌸`} />

      <div style={styles.scroll}>

        <DateNav onDateChange={(d) => setDateSelectee(d)} />

        {/* Message */}
        <Card>
          <div style={styles.messageRow}>
            <img src="/butterfly.png" alt="" style={styles.butterfly} />
            <p style={styles.messageText}>{message}</p>
          </div>
        </Card>

        {/* Humeur + Eau */}
        <div style={styles.row}>
          <Card title="Comment tu te sens ?" style={{ flex: 2 }}>
            <EmojiPicker value={humeur} onChange={handleHumeur} />
          </Card>

          <Card title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Eau</span>
              <img src="/water.png" alt="" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
              <span>{eau}/8</span>
            </div>
          } style={{ flex: 1 }}>
            <WaterTracker value={eau} onChange={handleEau} />
          </Card>
        </div>

        {/* Repas */}
        <Card title="Mes repas">
          <div style={styles.repasGrid}>
            {repas.map(r => (
              <div key={r.id} onClick={() => handleRepas(r.id)} style={{
                ...styles.repasItem,
                backgroundColor: r.mange ? theme.colors.repasBackground : theme.colors.background,
                border: r.mange ? `2px solid ${theme.colors.repasBorder}` : '2px solid transparent',
              }}>
                <img src={r.icon} alt={r.nom} style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                <span style={{
                  fontSize: '11px',
                  color: r.mange ? theme.colors.repasText : theme.colors.textSecondary,
                  fontFamily: theme.fonts.primary,
                }}>{r.nom}</span>
                {r.mange && <span style={{ fontSize: '12px', color: theme.colors.repasText }}>✓</span>}
              </div>
            ))}
          </div>
        </Card>

        {/* Fierté */}
        <Card title="🌟 Ma fierté du jour">
          <div style={styles.victoireRow}>
            <Input
              placeholder="Une petite victoire à célébrer..."
              value={victoire}
              onChange={e => setVictoire(e.target.value)}
            />
            <ButtonValid onClick={handleAjouterVictoire} icon="/plus.png" />
          </div>
          {victoires.length > 0 && (
            <div style={styles.victoireList}>
              {victoires.map((v, i) => (
                <div key={i} style={styles.victoireItem}>
                  <span style={{ color: theme.colors.primary }}>✓</span>
                  <span style={{ fontSize: '13px', color: theme.colors.textPrimary, fontFamily: theme.fonts.primary }}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

      </div>

      <div style={styles.floatingBtn} onClick={() => navigate('/chat')}>
        <img src="/bulle.png" alt="chat" style={{ width: '55px', height: '55px', objectFit: 'contain' }} />
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
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  messageRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  butterfly: {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
    flexShrink: 0,
  },
  messageText: {
    fontSize: '13px',
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: '1.5',
    margin: 0,
    flex: 1,
  },
  row: {
    display: 'flex',
    gap: '12px',
  },
  repasGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  repasItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '12px 8px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
victoireRow: {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  justifyContent: 'flex-start',
},
  victoireList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '10px',
  },
  victoireItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 10px',
    backgroundColor: theme.colors.background,
    borderRadius: '10px',
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