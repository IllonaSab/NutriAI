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
        <Card>
          <div style={styles.avatarSection}>
            <div style={styles.avatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={styles.userName}>{user?.name}</p>
              <p style={styles.userEmail}>{user?.email}</p>
              <span style={styles.providerBadge}>{user?.provider}</span>
            </div>
          </div>
        </Card>

        {/* Infos */}
        <Card title="Mes informations">
          <div style={styles.form}>
            <Input
              label="Nom complet"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="Ton nom"
            />
            <Input
              label="Âge"
              type="number"
              value={form.age}
              onChange={handleChange('age')}
              placeholder="25"
            />
            <Input
              label="Poids (kg)"
              type="number"
              value={form.poids}
              onChange={handleChange('poids')}
              placeholder="56"
            />
            <Input
              label="Taille (cm)"
              type="number"
              value={form.taille}
              onChange={handleChange('taille')}
              placeholder="165"
            />
          </div>
        </Card>

        {/* Objectif */}
        <Card title="Mon objectif">
          <div style={styles.objectifButtons}>
            {['Douceur', 'Stabilité', 'Réussite'].map((obj) => (
              <ButtonSelect
                key={obj}
                label={obj}
                selected={form.objectif === obj}
                onClick={() => setForm({ ...form, objectif: obj })}
              />
            ))}
          </div>
        </Card>

        {/* Succès */}
        {success && (
          <div style={styles.successMsg}>
            ✅ Profil mis à jour !
          </div>
        )}

        {/* Boutons */}
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
    alignItems: 'center',
    gap: '16px',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: theme.colors.primary,
    color: theme.colors.textLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: '500',
    flexShrink: 0,
  },
  userName: {
    fontSize: '16px',
    color: theme.colors.secondary,
    fontWeight: '500',
    margin: 0,
    fontFamily: theme.fonts.primary,
  },
  userEmail: {
    fontSize: '13px',
    color: theme.colors.textSecondary,
    margin: '4px 0',
    fontFamily: theme.fonts.primary,
  },
  providerBadge: {
    fontSize: '11px',
    backgroundColor: theme.colors.primary,
    color: theme.colors.textLight,
    padding: '2px 8px',
    borderRadius: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  objectifButtons: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    flexWrap: 'wrap',
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