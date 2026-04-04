import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { useUser } from '../context/UserContext'
import Header from '../components/Header'
import Button from '../components/Button'
import Card from '../components/Card'
import theme from '../theme'

const Abonnement = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (priceId) => {
    setLoading(true)
    try {
      const res = await axios.post(`${config.PAYMENT_URL}/payment/create-checkout`, {
        priceId,
        userId: user.id,
        email: user.email,
      })
      window.location.href = res.data.url
    } catch (err) {
      alert('Erreur lors du paiement')
    }
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <Header title="Mon abonnement" />

      <div style={styles.scroll}>

        {/* Plan gratuit */}
        <Card title="Plan gratuit">
          <div style={styles.planContent}>
            <p style={styles.price}>0€ / mois</p>
            <div style={styles.features}>
              <p style={styles.feature}>✓ Dashboard bienveillant</p>
              <p style={styles.feature}>✓ Suivi des repas</p>
              <p style={styles.feature}>✓ 5 messages IA / jour</p>
            </div>
            <div style={styles.currentBadge}>Plan actuel</div>
          </div>
        </Card>

        {/* Plan Premium */}
        <Card title="Plan Premium">
          <div style={styles.planContent}>
            <p style={styles.price}>9.99€ / mois</p>
            <div style={styles.features}>
              <p style={styles.feature}>✓ Tout du plan gratuit</p>
              <p style={styles.feature}>✓ Messages IA illimités</p>
              <p style={styles.feature}>✓ Analyse de repas avancée</p>
              <p style={styles.feature}>✓ Plan alimentaire personnalisé</p>
              <p style={styles.feature}>✓ Support prioritaire</p>
            </div>
            <Button
              label={loading ? 'Chargement...' : "S'abonner"}
              onClick={() => handleSubscribe('VOTRE_PRICE_ID')}
              variant="primary"
            />
          </div>
        </Card>

        <Button label="Retour" onClick={() => navigate('/profil')} variant="secondary" />

      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: theme.colors.background,
    fontFamily: theme.fonts.primary,
  },
  scroll: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  planContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  price: {
    fontSize: '24px',
    fontWeight: '500',
    color: theme.colors.primary,
    margin: 0,
    fontFamily: theme.fonts.primary,
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  feature: {
    fontSize: '13px',
    color: theme.colors.textSecondary,
    margin: 0,
    fontFamily: theme.fonts.primary,
  },
  currentBadge: {
    backgroundColor: theme.colors.background,
    color: theme.colors.textSecondary,
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    textAlign: 'center',
    border: `1px solid ${theme.colors.border}`,
    fontFamily: theme.fonts.primary,
  },
}

export default Abonnement