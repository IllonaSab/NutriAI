import { useNavigate } from 'react-router-dom'
import theme from '../theme'

const Header = ({ title }) => {
  const navigate = useNavigate()

  return (
    <div style={styles.header}>
      <img src="/Logo.png" alt="logo" style={styles.logo} />
      <h2 style={styles.title}>{title}</h2>
      <img
        src="/profil.png"
        alt="profil"
        style={styles.profil}
        onClick={() => navigate('/profil')}
      />
    </div>
  )
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    borderBottom: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.background,
  },
  logo: {
    width: '36px',
    height: '36px',
    borderRadius: theme.borderRadius.round,
  },
  title: {
    fontSize: '18px',
    color: theme.colors.secondary,
    margin: 0,
    fontFamily: theme.fonts.primary,
  },
  profil: {
    width: '36px',
    height: '36px',
    borderRadius: theme.borderRadius.round,
    cursor: 'pointer',
    objectFit: 'contain',
  }
}

export default Header