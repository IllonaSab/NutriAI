const express = require('express')
const { sendConfirmationEmail, sendPasswordResetEmail } = require('../services/email')
const { sendSMS } = require('../services/sms')
const { sendPushNotification } = require('../services/push')
const router = express.Router()

// Email de confirmation
router.post('/email/confirmation', async (req, res) => {
  const { to, name } = req.body
  try {
    await sendConfirmationEmail(to, name)
    res.json({ message: 'Email envoyé' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur email', error: err.message })
  }
})

// Email reset mot de passe
router.post('/email/reset', async (req, res) => {
  const { to, code } = req.body
  try {
    await sendPasswordResetEmail(to, code)
    res.json({ message: 'Email envoyé' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur email', error: err.message })
  }
})

// SMS reset mot de passe
router.post('/sms/reset', async (req, res) => {
  const { to, code } = req.body
  try {
    await sendSMS(to, code)
    res.json({ message: 'SMS envoyé' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur SMS', error: err.message })
  }
})

// Notification push
router.post('/push', async (req, res) => {
  const { token, title, body } = req.body
  try {
    await sendPushNotification(token, title, body)
    res.json({ message: 'Notification envoyée' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur push', error: err.message })
  }
})

module.exports = router