require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/ia', require('./routes/ia'))

app.listen(process.env.PORT || 3004, () => {
  console.log('IA service démarré sur le port 3004')
})