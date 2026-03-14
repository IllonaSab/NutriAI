const sendSMS = async (to, code) => {
  const twilio = require('twilio')
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  )
  await client.messages.create({
    body: `Ton code NutriAI : ${code}. Valable 10 minutes.`,
    from: process.env.TWILIO_PHONE,
    to
  })
}

module.exports = { sendSMS }