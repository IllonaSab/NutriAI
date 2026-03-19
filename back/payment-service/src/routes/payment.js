const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const router = express.Router()

// Créer un abonnement
router.post('/create-checkout', async (req, res) => {
  const { priceId, userId, email } = req.body
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel`,
      metadata: { userId }
    })
    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ message: 'Erreur paiement', error: err.message })
  }
})

// Vérifier un abonnement
router.get('/subscription/:customerId', async (req, res) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: req.params.customerId,
      status: 'active',
    })
    res.json({ active: subscriptions.data.length > 0, subscriptions: subscriptions.data })
  } catch (err) {
    res.status(500).json({ message: 'Erreur', error: err.message })
  }
})

// Webhook Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).json({ message: `Webhook Error: ${err.message}` })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    console.log('Paiement réussi pour:', session.metadata.userId)
  }

  res.json({ received: true })
})

module.exports = router