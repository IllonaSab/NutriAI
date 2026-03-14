require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', require('./routes/users'))

app.listen(3002, () => {
  console.log('DB service démarré sur le port 3002')
})