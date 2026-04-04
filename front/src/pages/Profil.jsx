import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { useUser } from '../context/UserContext'
import Header from '../components/Header'
import Input from '../components/Input'
import Button, { ButtonSelect } from '../components/Button'
import Card from '../components/Card'
import theme from '../theme'

const Profil = () => {
  const navigate = useNavigate()
  const { user, login, logout } = useUser()

  const [form, setForm] = useState({
    name: user?.name || '',
    age: user?.age || '',
    poids: user?.poids || '',
    taille: user?.taille || '',
    objectif: user?.objectif || '',
  })

  const [success, setSuccess] = useState(false)

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handleSave = async () => {
    try {
      const res = await axios.post(`${config.DB_URL}/users/upsert`, {
        email: user.email,
        name: form.name,
        provider: user.provider,
        providerId: user.providerId,
        age: parseInt(form.age),
        poids: parseFloat(form.poids),
        taille: parseFloat(form.taille),
        objectif: form.objectif,
        password: user.password,
      })
      login(res.data)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      alert('Erreur lors de la sauvegarde')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <Header title="Mon profil" />

      <div style={styles.scroll}>

        {/* Avatar */}
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <p style={styles.userName}>{user?.name}</p>
          <p style={styles.userEmail}>{user?.email}</p>
          <span style={styles.providerBadge}>{user?.provider}</span>
        </div>

        {/* Infos */}
       <Card title="Mes informations">
  <div style={styles.row}>
    <div style={{ flex: 1 }}>
      <Input label="Âge" type="number" value={form.age} onChange={handleChange('age')} placeholder="25" />
    </div>
    <div style={{ flex: 1 }}>
      <Input label="Poids (kg)" type="number" value={form.poids} onChange={handleChange('poids')} placeholder="56" />
    </div>
    <div style={{ flex: 1 }}>
      <Input label="Taille (cm)" type="number" value={form.taille} onChange={handleChange('taille')} placeholder="165" />
    </div>
  </div>
</Card>

        {/* Mon compte */}
        <Card title="Mon compte">
  <div style={styles.menuList}>
    <div style={styles.menuItem} onClick={() => navigate('/change-password')}>
      <div style={styles.menuLeft}>
        <img src="/mdp.png" alt="" style={styles.menuIcon} />
        <span>Modifier mon mot de passe</span>
      </div>
    </div>
    <div style={styles.menuItem} onClick={() => navigate('/abonnement')}>
      <div style={styles.menuLeft}>
        <img src="/abonnement.png" alt="" style={styles.menuIcon} />
        <span>Mon abonnement</span>
      </div>
    </div>
    <div style={styles.menuItem} onClick={() => navigate('/support')}>
      <div style={styles.menuLeft}>
        <img src="/support.png" alt="" style={styles.menuIcon} />
        <span>Support & Aide</span>
      </div>
    </div>
  </div>
</Card>

        {success && (
          <div style={styles.successMsg}>✅ Profil mis à jour !</div>
        )}

        <Button label="Sauvegarder" onClick={handleSave} variant="primary" />
        <Button label="Se déconnecter" onClick={handleLogout} variant="secondary" />

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
  avatarSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '20px 0',
  },
  avatar: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: theme.colors.primary,
    color: theme.colors.textLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: '500',
    marginBottom: '8px',
  },
  userName: {
    fontSize: '18px',
    color: theme.colors.secondary,
    fontWeight: '500',
    margin: 0,
    fontFamily: theme.fonts.primary,
  },
  userEmail: {
    fontSize: '13px',
    color: theme.colors.textSecondary,
    margin: 0,
    fontFamily: theme.fonts.primary,
  },
  providerBadge: {
    fontSize: '11px',
    backgroundColor: theme.colors.primary,
    color: theme.colors.textLight,
    padding: '2px 10px',
    borderRadius: '20px',
    marginTop: '4px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  row: {
    display: 'flex',
    gap: '8px',
  },

  menuList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
menuItem: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  padding: '12px 8px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '14px',
  color: theme.colors.textPrimary,
  fontFamily: theme.fonts.primary,
  backgroundColor: theme.colors.background,
  transition: 'all 0.2s',
},
  menuLeft: {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
},
menuIcon: {
  width: '24px',
  height: '24px',
  objectFit: 'contain',
},
  arrow: {
    color: theme.colors.primary,
    fontSize: '16px',
  },
  successMsg: {
    backgroundColor: theme.colors.repasBackground,
    color: theme.colors.repasText,
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    textAlign: 'center',
    fontFamily: theme.fonts.primary,
  },
}

export default Profil