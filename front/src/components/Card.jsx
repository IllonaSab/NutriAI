import theme from '../theme'

const Card = ({ title, children, style }) => {
  return (
    <div style={{ ...styles.card, ...style }}>
      {title && <p style={styles.cardTitle}>{title}</p>}
      {children}
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#FFF',
    borderRadius: '20px',
    padding: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: theme.colors.secondary,
    marginBottom: '10px',
    fontFamily: theme.fonts.primary,
    margin: '0 0 10px 0',
  }
}

export default Card