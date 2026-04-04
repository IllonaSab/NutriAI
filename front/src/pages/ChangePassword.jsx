import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { useUser } from '../context/UserContext'
import Header from '../components/Header'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import theme from '../theme'

const ChangePassword = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
    setError('')
  }

  const handleSave = async () => {
    if (form.newPassword !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    if (form.newPassword.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères')
      return
    }
    try {
      await axios.post(`${config.AUTH_URL}/auth/change-password`, {
        email: user.email,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
      setSuccess(true)
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => navigate('/profil'), 2000)
    } catch (err) {
      setError('Mot de passe actuel incorrect')
    }
  }

  return (
    <div style={styles.container}>
      <Header title="Modifier mon mot de passe" />

      <div style={styles.scroll}>
        <Card title="Nouveau mot de passe">
          <div style={styles.form}>
            <Input
              label="Mot de passe actuel"
              type="password"
              placeholder="••••••••"
              value={form.currentPassword}
              onChange={handleChange('currentPassword')}
            />
            <Input
              label="Nouveau mot de passe"
              type="password"
              placeholder="••••••••"
              value={form.newPassword}
              onChange={handleChange('newPassword')}
            />
            <Input
              label="Confirmer le mot de passe"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
            />
          </div>
        </Card>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>✅ Mot de passe modifié !</p>}

        <Button label="Sauvegarder" onClick={handleSave} variant="primary" />
        <Button label="Annuler" onClick={() => navigate('/profil')} variant="secondary" />
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  error: {
    color: theme.colors.error,
    fontSize: '13px',
    textAlign: 'center',
    fontFamily: theme.fonts.primary,
    margin: 0,
  },
  success: {
    color: theme.colors.repasText,
    fontSize: '13px',
    textAlign: 'center',
    fontFamily: theme.fonts.primary,
    margin: 0,
  },
}

export default ChangePassword