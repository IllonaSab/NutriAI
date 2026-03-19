const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const analyzeNutrition = async (message) => {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: 'Tu es un assistant bienveillant spécialisé en nutrition. Tu réponds TOUJOURS en français, de façon douce et encourageante.' },
      { role: 'user', content: message }
    ],
    model: 'llama-3.3-70b-versatile',
  })
  return completion.choices[0].message.content
}

const analyzeMeal = async (meal) => {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: 'Tu es un expert en nutrition. Réponds en français.' },
      { role: 'user', content: `Analyse ce repas : "${meal}"` }
    ],
    model: 'llama-3.3-70b-versatile',
  })
  return completion.choices[0].message.content
}

const generateMealPlan = async (preferences) => {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: 'Tu es un expert en nutrition. Réponds en français.' },
      { role: 'user', content: `Crée un plan de repas pour une semaine basé sur : "${preferences}"` }
    ],
    model: 'llama-3.3-70b-versatile',
  })
  return completion.choices[0].message.content
}

module.exports = { analyzeNutrition, analyzeMeal, generateMealPlan }