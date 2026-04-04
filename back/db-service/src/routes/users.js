const express = require('express')
const { PrismaClient } = require('@prisma/client')
const router = express.Router()
const prisma = new PrismaClient()

// Créer ou trouver un utilisateur après OAuth
router.post('/upsert', async (req, res) => {
  const { email, name, provider, providerId, password, age, poids, taille, objectif } = req.body
  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, provider, providerId, password, age, poids, taille, objectif },
      create: { email, name, provider, providerId, password, age, poids, taille, objectif }
    })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// Sauvegarder les données du jour
router.post('/jour', async (req, res) => {
  const { userId, date, humeur, repas, eau, victoire } = req.body
  try {
    const jour = await prisma.jourData.upsert({
      where: { userId_date: { userId, date } },
      update: { humeur, repas: JSON.stringify(repas), eau, victoire },
      create: { userId, date, humeur, repas: JSON.stringify(repas), eau, victoire }
    })
    res.json(jour)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// Récupérer les données d'un jour
router.get('/jour/:userId/:date', async (req, res) => {
  try {
    const jour = await prisma.jourData.findUnique({
      where: { userId_date: { userId: req.params.userId, date: req.params.date } }
    })
    if (!jour) return res.status(404).json({ message: 'Pas de données pour ce jour' })
    res.json({ ...jour, repas: JSON.parse(jour.repas || '[]') })
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