import theme from '../theme'

const Input = ({ label, type = 'text', placeholder, value, onChange }) => {
  return (
    <div style={styles.inputGroup}>
      {label && <label style={styles.label}>{label}</label>}
      <input
        style={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const styles = {
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: '14px',
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.primary,
      width: '72%',
  },
  input: {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: '12px',
    border: `1px solid ${theme.colors.inputBorder}`,
    backgroundColor: theme.colors.inputBackground,
    fontSize: '14px',
    color: theme.colors.textPrimary,
    outline: 'none',
    fontFamily: theme.fonts.primary,
    width: '70%',
  }
}

export default Input