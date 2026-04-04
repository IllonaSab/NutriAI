const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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

// --- Inscription email/mot de passe ---
router.post('/register', async (req, res) => {
  const { email, password, name, age, poids, taille, objectif } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const response = await fetch('http://localhost:3002/users/upsert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
        provider: 'local',
        providerId: email,
        password: hashedPassword,
        age: parseInt(age),
        poids: parseFloat(poids),
        taille: parseFloat(taille),
        objectif
      })
    })
    const user = await response.json()
    const token = generateToken(user)
    res.json({ token, user })
  } catch (err) {
    res.status(500).json({ message: 'Erreur inscription', error: err.message })
  }
})

// --- Connexion email/mot de passe ---
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const response = await fetch(`http://localhost:3002/users/${email}`)
    if (!response.ok) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
    }
    const user = await response.json()

    if (!user.password) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
    }

    const isValid = await bcrypt.compare(String(password), String(user.password))
    if (!isValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
    }

    const token = generateToken(user)
    res.json({ token, user })
  } catch (err) {
    res.status(500).json({ message: 'Erreur connexion', error: err.message })
  }
})

module.exports = router