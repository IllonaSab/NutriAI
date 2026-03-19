import theme from '../theme'

export const Button = ({ label, onClick, variant = 'primary', fullWidth = true }) => {
  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    button: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      borderRadius: theme.borderRadius.large,
      border: variant === 'primary' ? 'none' : `1px solid ${theme.colors.secondary}`,
      backgroundColor: variant === 'primary' ? theme.colors.primary : 'transparent',
      color: variant === 'primary' ? theme.colors.textLight : theme.colors.secondary,
      fontSize: '14px',
      cursor: 'pointer',
      fontFamily: theme.fonts.primary,
      width: fullWidth ? '40%' : 'auto',
    }
  }

  return (
    <div style={styles.wrapper}>
      <button style={styles.button} onClick={onClick}>
        {label}
      </button>
    </div>
  )
}

export const ButtonSelect = ({ label, selected, onClick }) => {
  const styles = {
    button: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      borderRadius: theme.borderRadius.large,
      border: `1px solid ${theme.colors.secondary}`,
      backgroundColor: selected ? theme.colors.primary : 'transparent',
      color: selected ? theme.colors.textLight : theme.colors.secondary,
      fontSize: '13px',
      cursor: 'pointer',
      fontFamily: theme.fonts.primary,
    }
  }

  return (
    <button style={styles.button} onClick={onClick}>
      {label}
    </button>
  )
}



export const ButtonValid = ({ onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      style={{
      border: 'none',
      backgroundColor: theme.colors.primary,
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0,
      marginLeft: '-25%',
    }}
    >
      <img src={icon || '/plus.png'} alt="ajouter" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
    </button>
  )
}

export default Button