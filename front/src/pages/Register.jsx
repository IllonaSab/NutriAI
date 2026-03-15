import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button, { ButtonSelect } from '../components/Button'
import theme from '../theme'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    age: '',
    poids: '',
    taille: '',
    objectif: ''
  })

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handleRegister = () => {
    console.log('Register', form)
  }

  const handleGoogle = () => {
    window.location.href = `http://localhost:3001/auth/google`
  }

  const handleApple = () => {
    window.location.href = `http://localhost:3001/auth/apple`
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <img src="/Logo.png" alt="logo" style={styles.logo} />
        <h1 style={styles.title}>Register</h1>
        <div style={styles.placeholder} />
      </div>

      {/* Formulaire */}
      <div style={styles.form}>
        <Input label="Nom" placeholder="Durant" value={form.nom} onChange={handleChange('nom')} />
        <Input label="Prénom" placeholder="Valérie" value={form.prenom} onChange={handleChange('prenom')} />
        <Input label="Email" type="email" placeholder="exemple@gmail.com" value={form.email} onChange={handleChange('email')} />
        <Input label="Mot de passe" type="password" placeholder="••••••••" value={form.password} onChange={handleChange('password')} />
        <Input label="Âge" type="number" placeholder="25" value={form.age} onChange={handleChange('age')} />
        <Input label="Poids (kg)" type="number" placeholder="56" value={form.poids} onChange={handleChange('poids')} />
        <Input label="Taille (cm)" type="number" placeholder="165" value={form.taille} onChange={handleChange('taille')} />

        {/* Objectif */}
        <div style={styles.objectifContainer}>
          <label style={styles.label}>Objectif</label>
          <div style={styles.objectifButtons}>
            {['Perte de poids', 'Maintient', 'Prise de masse'].map((obj) => (
  <ButtonSelect
    key={obj}
    label={obj}
    selected={form.objectif === obj}
    onClick={() => setForm({ ...form, objectif: obj })}
  />
))}
          </div>
        </div>

        <Button label="Connexion" onClick={handleRegister} variant="primary" />
        <Button label="Se connecter avec Google" onClick={handleGoogle} variant="secondary" />
        <Button label="Se connecter avec Apple" onClick={handleApple} variant="secondary" />

        <p style={styles.loginLink}>
          Déjà un compte ?{' '}
          <span style={styles.link} onClick={() => navigate('/login')}>Se connecter</span>
        </p>
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
  padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  overflowY: 'auto',
},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  logo: {
    width: '36px',
    height: '36px',
    borderRadius: theme.borderRadius.round,
  },
  title: {
    fontSize: '28px',
    color: theme.colors.secondary,
    margin: 0,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  placeholder: {
    width: '36px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  objectifContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    alignItems: 'center',
    },
    objectifButtons: {
    display: 'flex',
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: '14px',
    color: theme.colors.textPrimary,
  },
  loginLink: {
    textAlign: 'center',
    fontSize: '14px',
    color: theme.colors.textSecondary,
  },
  link: {
    color: theme.colors.primary,
    cursor: 'pointer',
    textDecoration: 'underline',
  }
}

export default Register