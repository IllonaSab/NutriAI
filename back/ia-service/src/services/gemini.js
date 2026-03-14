const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

const analyzeNutrition = async (message) => {
  const prompt = `
    Tu es un expert en nutrition. Réponds en français.
    L'utilisateur dit : "${message}"
    Donne des conseils nutritionnels précis, clairs et bienveillants.
  `
  const result = await model.generateContent(prompt)
  return result.response.text()
}

const analyzeMeal = async (meal) => {
  const prompt = `
    Tu es un expert en nutrition. Réponds en français.
    Analyse ce repas : "${meal}"
    Donne les informations suivantes en JSON :
    - calories (estimation)
    - proteines (en grammes)
    - glucides (en grammes)
    - lipides (en grammes)
    - conseils (tableau de conseils)
  `
  const result = await model.generateContent(prompt)
  return result.response.text()
}

const generateMealPlan = async (preferences) => {
  const prompt = `
    Tu es un expert en nutrition. Réponds en français.
    Crée un plan de repas pour une semaine basé sur ces préférences : "${preferences}"
    Format : un plan clair avec petit déjeuner, déjeuner, dîner et collation pour chaque jour.
  `
  const result = await model.generateContent(prompt)
  return result.response.text()
}

module.exports = { analyzeNutrition, analyzeMeal, generateMealPlan }