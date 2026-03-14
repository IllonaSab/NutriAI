const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, provider: user.provider },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// --- Google ---
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/error' }),
  (req, res) => {
    const token = generateToken(req.user)
    res.redirect(`http://localhost:3000?token=${token}`)
  }
)

// --- Apple ---
router.post('/apple',
  passport.authenticate('apple', { session: false })
)

router.post('/apple/callback',
  passport.authenticate('apple', { session: false, failureRedirect: '/auth/error' }),
  (req, res) => {
    const token = generateToken(req.user)
    res.redirect(`http://localhost:3000?token=${token}`)
  }
)

// --- Vérifier un token (utilisé par les autres services) ---
router.get('/verify', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ valid: true, user: decoded })
  } catch {
    res.status(401).json({ valid: false })
  }
})

router.get('/error', (req, res) => {
  res.status(401).json({ message: 'Erreur de connexion OAuth' })
})

module.exports = router