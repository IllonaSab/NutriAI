import theme from '../theme'

const EmojiPicker = ({ value, onChange }) => {
  const emojis = [
    { img: '/decu.png', label: 'Déçu' },
    { img: '/neutre.png', label: 'Neutre' },
    { img: '/bien.png', label: 'Bien' },
    { img: '/super.png', label: 'Super' },
  ]

  return (
    <div style={styles.grid}>
      {emojis.map((e, i) => (
        <div key={i} onClick={() => onChange(i)} style={{
          ...styles.item,
          backgroundColor: value === i ? theme.colors.primary : theme.colors.background,
        }}>
          <img src={e.img} alt={e.label} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          <span style={{
            fontSize: '9px',
            color: value === i ? theme.colors.surface : theme.colors.textSecondary,
            fontFamily: theme.fonts.primary,
          }}>{e.label}</span>
        </div>
      ))}
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '6px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    padding: '8px 4px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
}

export default EmojiPicker