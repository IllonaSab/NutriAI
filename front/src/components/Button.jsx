import theme from '../theme'

const Button = ({ label, onClick, variant = 'primary', fullWidth = true }) => {
  const styles = {
   button: {
     padding: `${theme.spacing.sm} ${theme.spacing.md}`,
     borderRadius: theme.borderRadius.large,
     border: variant === 'primary' ? 'none' : `1px solid ${theme.colors.secondary}`,
     backgroundColor: variant === 'primary' ? theme.colors.primary : 'transparent',
     color: variant === 'primary' ? theme.colors.textLight : theme.colors.secondary,
     fontSize: '14px',
     cursor: 'pointer',
     fontFamily: theme.fonts.primary,
     width: '42%',
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    <button style={styles.button} onClick={onClick}>
      {label}
    </button>
  </div>
  )
}

export default Button