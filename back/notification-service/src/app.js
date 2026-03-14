require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/notifications', require('./routes/notifications'))

app.listen(process.env.PORT || 3003, () => {
  console.log('Notification service démarré sur le port 3003')
})