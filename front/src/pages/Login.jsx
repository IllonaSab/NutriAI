import { useState } from 'react'
import theme from '../theme'
import { useNavigate } from 'react-router-dom'

import Input from '../components/Input'
import Button from '../components/Button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log('Login avec', email, password)
  }
  const navigate = useNavigate()
  const handleGoogle = () => {
    window.location.href = `${process.env.REACT_APP_AUTH_URL}/auth/google`
  }

  const handleApple = () => {
    window.location.href = `${process.env.REACT_APP_AUTH_URL}/auth/apple`
  }

  return (
    <div style={styles.container}>
      {/* Header Logo+Title */}
      <div style={styles.header}>
  <img src="/Logo.png" alt="logo" style={styles.logo} />
  <h1 style={styles.title}>Login</h1>
  <div style={styles.placeholder} />
</div>

      {/* Formulaire */}
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


        {/* Bouton Connexion */}
        <Button label="Connexion" onClick={handleLogin} variant="primary" />

        {/* Bouton Google */}
        <Button label="Se connecter avec Google" onClick={handleGoogle} variant="secondary" />

        {/* Bouton Apple */}
        <Button label="Se connecter avec Apple" onClick={handleApple} variant="secondary" />

        {/* Lien Register */}
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
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  },
  label: {
    fontSize: '14px',
    color: theme.colors.textPrimary,
  },
  input: {
    padding: `${theme.spacing.md} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.small,
    border: `1px solid ${theme.colors.primary}`,
    backgroundColor: theme.colors.surface,
    fontSize: '15px',
    color: theme.colors.textPrimary,
    outline: 'none',
    fontFamily: theme.fonts.primary,
  },
  btnPrimary: {
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    borderRadius: theme.borderRadius.large,
    border: 'none',
    backgroundColor: theme.colors.primary,
    color: theme.colors.textLight,
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: theme.fonts.primary,
    marginTop: theme.spacing.lg,
  },
  btnSecondary: {
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    borderRadius: theme.borderRadius.large,
    border: `1px solid ${theme.colors.secondary}`,
    backgroundColor: 'transparent',
    color: theme.colors.secondary,
    fontSize: '15px',
    cursor: 'pointer',
    fontFamily: theme.fonts.primary,
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