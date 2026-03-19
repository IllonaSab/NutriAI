import theme from '../theme'

const Card = ({ title, children, style }) => {
  return (
    <div style={{ ...styles.card, ...style }}>
      {title && (
        <div style={styles.titleRow}>
          <p style={styles.cardTitle}>{title}</p>
          <div style={styles.titleLine} />
        </div>
      )}
      {children}
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: '20px',
    padding: '16px',
    boxShadow: '0 4px 16px rgba(200,168,75,0.08)',
    border: `1px solid ${theme.colors.border}`,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
  },
  cardTitle: {
    fontSize: '13px',
    fontWeight: '500',
    color: theme.colors.secondary,
    fontFamily: theme.fonts.primary,
    margin: 0,
    whiteSpace: 'nowrap',
  },
  titleLine: {
    flex: 1,
    height: '1px',
    backgroundColor: theme.colors.border,
  },
}

export default Card