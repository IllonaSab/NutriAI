import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import theme from '../theme'

const DateNav = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  const dateFormatee = date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

  const estAujourdhui = date.toDateString() === new Date().toDateString()

  const jourPrecedent = () => {
    const d = new Date(date)
    d.setDate(d.getDate() - 1)
    setDate(d)
    onDateChange && onDateChange(d)
  }

  const jourSuivant = () => {
    if (estAujourdhui) return
    const d = new Date(date)
    d.setDate(d.getDate() + 1)
    setDate(d)
    onDateChange && onDateChange(d)
  }

  const handleCalendarChange = (d) => {
    setDate(d)
    onDateChange && onDateChange(d)
    setShowCalendar(false)
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>

        <div style={styles.arrowBtn} onClick={jourPrecedent}>
          <img src="/pointer.png" alt="précédent" style={{ ...styles.arrowImg, transform: 'scaleX(-1)' }} />
        </div>

        <div style={styles.dateCenter} onClick={() => setShowCalendar(!showCalendar)}>
          <img src="/calendrier.png" alt="" style={styles.calIcon} />
          <div>
            <p style={styles.dateText}>{dateFormatee}</p>
            {estAujourdhui && <p style={styles.todayBadge}>Aujourd'hui</p>}
          </div>
        </div>

        <div style={{
          ...styles.arrowBtn,
          opacity: estAujourdhui ? 0.3 : 1,
          cursor: estAujourdhui ? 'default' : 'pointer',
        }} onClick={jourSuivant}>
          <img src="/pointer.png" alt="suivant" style={styles.arrowImg} />
        </div>

      </div>

      {showCalendar && (
        <div style={styles.calendarContainer}>
          <Calendar
            onChange={handleCalendarChange}
            value={date}
            maxDate={new Date()}
            locale="fr-FR"
          />
        </div>
      )}
    </div>
  )
}

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px',
    backgroundColor: theme.colors.surface,
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  arrowBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: theme.colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: `1px solid ${theme.colors.border}`,
  },
  arrowImg: {
    width: '14px',
    height: '14px',
    objectFit: 'contain',
  },
  dateCenter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '6px 14px',
    borderRadius: '20px',
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
  },
  calIcon: {
    width: '18px',
    height: '18px',
    objectFit: 'contain',
  },
  dateText: {
    fontSize: '13px',
    color: theme.colors.secondary,
    fontFamily: theme.fonts.primary,
    textTransform: 'capitalize',
    margin: 0,
    whiteSpace: 'nowrap',
  },
  todayBadge: {
    fontSize: '10px',
    color: theme.colors.primary,
    fontFamily: theme.fonts.primary,
    margin: 0,
    textAlign: 'center',
  },
  calendarContainer: {
    position: 'absolute',
    top: '110%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 200,
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    borderRadius: '16px',
    overflow: 'hidden',
  },
}

export default DateNav