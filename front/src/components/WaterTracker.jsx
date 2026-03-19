import theme from '../theme'

const WaterTracker = ({ value, onChange, max = 8 }) => {
  return (
    <div style={styles.grid}>
      {[...Array(max)].map((_, i) => (
        <img
          key={i}
          src="/water.png"
          alt="verre"
          onClick={() => onChange(i)}
          style={{
            width: '24px',
            height: '24px',
            objectFit: 'contain',
            opacity: i < value ? 1 : 0.2,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        />
      ))}
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',  
    gap: '10px',
    justifyItems: 'center',
    padding: '25px 15px',
  },
}

export default WaterTracker