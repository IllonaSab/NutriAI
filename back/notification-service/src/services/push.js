const admin = require('firebase-admin')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  })
}

const sendPushNotification = async (token, title, body) => {
  await admin.messaging().send({
    token,
    notification: { title, body }
  })
}

module.exports = { sendPushNotification }