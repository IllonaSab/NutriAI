const express = require('express')
const { PrismaClient } = require('@prisma/client')
const router = express.Router()
const prisma = new PrismaClient()

// Créer ou trouver un utilisateur après OAuth
router.post('/upsert', async (req, res) => {
  const { email, name, provider, providerId, age, poids, taille, objectif } = req.body

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, provider, providerId, age, poids, taille, objectif },
      create: { email, name, provider, providerId, age, poids, taille, objectif }
    })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// Récupérer un utilisateur par email
router.get('/:email', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.params.email }
    })
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

module.exports = router