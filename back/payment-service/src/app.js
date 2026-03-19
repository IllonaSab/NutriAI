require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/payment', require('./routes/payment'))

app.listen(process.env.PORT || 3005, () => {
  console.log('Payment service démarré sur le port 3005')
})