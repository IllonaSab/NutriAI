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
        <img src="/pointer.png" alt="précédent" style={{ width: '24px', height: '24px', objectFit: 'contain', cursor: 'pointer', transform: 'scaleX(-1)' }} onClick={jourPrecedent} />
        <span style={styles.dateText} onClick={() => setShowCalendar(!showCalendar)}>
        <img src="/calendrier.png" alt="calendrier" style={{ width: '18px', height: '18px', objectFit: 'contain', marginRight: '6px', verticalAlign: 'middle' }} />
         {dateFormatee}
        </span>
        <img src="/pointer.png" alt="suivant" style={{
             width: '16px',
             height: '16px',
             objectFit: 'contain',
             cursor: estAujourdhui ? 'default' : 'pointer',
             opacity: estAujourdhui ? 0.3 : 1,
         }} onClick={jourSuivant}/>
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
        justifyContent: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    backgroundColor: theme.colors.surface,
    borderRadius: '16px',
    border: `1px solid ${theme.colors.primary}`,
    },
  dateText: {
  fontSize: '13px',
  color: theme.colors.secondary,
  fontFamily: theme.fonts.primary,
  textTransform: 'capitalize',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  whiteSpace: 'nowrap',
},
  calendarContainer: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 200,
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    borderRadius: '16px',
    overflow: 'hidden',
  },
}

export default DateNav