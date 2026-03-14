const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const AppleStrategy = require('passport-apple')

// Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.CALLBACK_URL}/auth/google/callback`
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Sauvegarde l'utilisateur dans le DB Service
    const response = await fetch('http://localhost:3002/users/upsert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: profile.emails[0].value,
        name: profile.displayName,
        provider: 'google',
        providerId: profile.id
      })
    })
    const user = await response.json()
    return done(null, user)
  } catch (err) {
    return done(err)
  }
}))

// Apple (inchangé)
passport.use(new AppleStrategy({
  clientID: process.env.APPLE_CLIENT_ID,
  teamID: process.env.APPLE_TEAM_ID,
  keyID: process.env.APPLE_KEY_ID,
  privateKeyLocation: process.env.APPLE_KEY_PATH,
  callbackURL: `${process.env.CALLBACK_URL}/auth/apple/callback`,
  passReqToCallback: true
},
async (req, accessToken, refreshToken, idToken, profile, done) => {
  try {
    const response = await fetch('http://localhost:3002/users/upsert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: idToken.email,
        name: req.body?.user ? JSON.parse(req.body.user).name?.firstName : 'Utilisateur Apple',
        provider: 'apple',
        providerId: idToken.sub
      })
    })
    const user = await response.json()
    return done(null, user)
  } catch (err) {
    return done(err)
  }
}))