import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { useUser } from '../context/UserContext'
import Input from '../components/Input'
import Button from '../components/Button'
import theme from '../theme'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (!email || !password) return
    try {
      const res = await axios.post(`${config.AUTH_URL}/auth/login`, {
        email,
        password
      })
      login(res.data.user)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      alert('Email ou mot de passe incorrect')
    }
  }

  const handleGoogle = () => {
    window.location.href = `${config.AUTH_URL}/auth/google`
  }

  const handleApple = () => {
    window.location.href = `${config.AUTH_URL}/auth/apple`
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src="/Logo.png" alt="logo" style={styles.logo} />
        <h1 style={styles.title}>Login</h1>
        <div style={styles.placeholder} />
      </div>

      <div style={styles.form}>
        <Input
          label="Email"
          type="email"
          placeholder="exemple@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          label="Mot de passe"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <Button label="Connexion" onClick={handleLogin} variant="primary" />
      <Button label="Se connecter avec Google" onClick={handleGoogle} variant="secondary" />
      <Button label="Se connecter avec Apple" onClick={handleApple} variant="secondary" />

      <p style={styles.registerLink}>
        Pas encore de compte ?{' '}
        <span style={styles.link} onClick={() => navigate('/register')}>
          S'inscrire
        </span>
      </p>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.colors.background,
    fontFamily: theme.fonts.primary,
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    justifyContent: 'space-between',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    position: 'relative',
    marginTop: theme.spacing.sm,
  },
  logo: {
    width: '50px',
    height: '50px',
    borderRadius: theme.borderRadius.round,
  },
  title: {
    fontSize: '20px',
    color: theme.colors.secondary,
    margin: 0,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  placeholder: {
    width: '50px',
    height: '50px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
  registerLink: {
    textAlign: 'center',
    fontSize: '14px',
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
  link: {
    color: theme.colors.primary,
    cursor: 'pointer',
    textDecoration: 'underline',
  }
}

export default Login