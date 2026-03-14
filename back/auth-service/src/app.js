require('dotenv').config()
const express = require('express')
const passport = require('passport')
const cors = require('cors')

require('./config/passport')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // nécessaire pour Apple (envoie du form-data)
app.use(passport.initialize())

app.use('/auth', require('./routes/auth'))

app.listen(3001, () => {
  console.log('Auth service démarré sur le port 3001')
})