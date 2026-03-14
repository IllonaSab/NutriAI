const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const sendConfirmationEmail = async (to, name) => {
  await transporter.sendMail({
    from: `"NutriAI" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Bienvenue sur NutriAI !',
    html: `
      <h1>Bonjour ${name} !</h1>
      <p>Bienvenue sur NutriAI. Ton compte a été créé avec succès.</p>
    `
  })
}

const sendPasswordResetEmail = async (to, code) => {
  await transporter.sendMail({
    from: `"NutriAI" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Réinitialisation de ton mot de passe',
    html: `
      <h1>Réinitialisation de mot de passe</h1>
      <p>Ton code de réinitialisation est : <strong>${code}</strong></p>
      <p>Ce code expire dans 10 minutes.</p>
    `
  })
}

module.exports = { sendConfirmationEmail, sendPasswordResetEmail }