const express = require('express')
const { analyzeNutrition, analyzeMeal, generateMealPlan } = require('../services/groq')
const router = express.Router()

// Conseils nutritionnels
router.post('/nutrition', async (req, res) => {
  const { message } = req.body
  try {
    const response = await analyzeNutrition(message)
    res.json({ response })
  } catch (err) {
    res.status(500).json({ message: 'Erreur IA', error: err.message })
  }
})

// Analyse d'un repas
router.post('/meal', async (req, res) => {
  const { meal } = req.body
  try {
    const response = await analyzeMeal(meal)
    res.json({ response })
  } catch (err) {
    res.status(500).json({ message: 'Erreur IA', error: err.message })
  }
})

// Plan de repas
router.post('/meal-plan', async (req, res) => {
  const { preferences } = req.body
  try {
    const response = await generateMealPlan(preferences)
    res.json({ response })
  } catch (err) {
    res.status(500).json({ message: 'Erreur IA', error: err.message })
  }
})

module.exports = router