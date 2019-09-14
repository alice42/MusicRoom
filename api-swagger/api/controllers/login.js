const md5 = require('blueimp-md5')
const { findUserBy, getProfileData } = require('../../helpers/firebaseUsers.helpers')
const { createSession } = require('../../helpers/firebaseSession.helpers')
const { isFacebookTokenValid } = require('../../helpers/facebook.helpers')
const { isGoogleTokenValid } = require('../../helpers/google.helpers')

async function classicLogin(req, res) {
  try {
    const database = res.database
    const { email: userMail, password } = req.body
    const email = userMail.toLowerCase()

    const user = await findUserBy('email', email, database)

    if (user) {
      if (typeof user.tokenValidation === 'string') {
        return res.status(403).send({ error: 'account needs to be activated' })
      }
      if (user.password === md5(password)) {
        const sessionId = await createSession(database, user._id)
        return res.status(200).send({
          sessionId,
          user: getProfileData(user)
        })
      } else {
        return res.status(403).send({ error: 'bad credentials' })
      }
    } else {
      return res.status(403).send({ error: 'bad credentials' })
    }
  } catch (err) {
    console.log('INTER ERROR', err.message)
    return res.status(500).send({ error: 'internal server error' })
  }
}

// @TODO CHECK MAIL
// @TODO REGISTER WITH FACEBOOK INFO, token or whatever
// login via facebook ( email, userToken )
// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow#checktoken
async function facebookLogin(req, res) {
  try {
    const database = res.database
    const { email: userMail, userToken } = req.body
    const email = userMail.toLowerCase()

    const facebookTokenValid = await isFacebookTokenValid(userToken)
    if (!facebookTokenValid) {
      return res.status(403).send({ error: 'error with token' })
    }
    const user = await findUserBy('email', email, database)
    if (!user) {
      payload = {
        email,
        token: { facebook: facebookTokenValid },
        signInType: 'facebook'
      }
      await insertUser(payload, database)
    } else if (user && user.token && !user.token.facebook) {
      await updatetUserNode(user._id, 'token', { facebook: facebookTokenValid }, database)
    }
    const sessionId = await createSession(database, user._id)
    return res.status(200).send({
      sessionId,
      user: getProfileData(user)
    })
  } catch (err) {
    console.log('INTER ERROR', err.message)
    return res.status(500).send({ error: 'internal server error' })
  }
}

// login via google ( to define )
// https://developers.google.com/identity/sign-in/web/backend-auth
async function googleLogin(req, res) {
  try {
    const database = res.database
    const { email: userMail, userToken } = req.body
    const email = userMail.toLowerCase()

    const googleTokenValid = await isGoogleTokenValid(userToken)
    if (!googleTokenValid) {
      return res.status(403).send({ error: 'error with token' })
    }
    const user = await findUserBy('email', email, database)
    // verify if facebook email is the same in case of exists
    if (!user) {
      payload = {
        email,
        token: { google: googleTokenValid },
        signInType: 'google'
      }
      await insertUser(payload, database)
    } else if (user && user.token && !user.token.google) {
      await updatetUserNode(user._id, 'token', { google: googleTokenValid }, database)
    }
    const sessionId = await createSession(database, user._id)
    return res.status(200).send({
      sessionId,
      user: getProfileData(user)
    })
  } catch (err) {
    console.log('INTER ERROR', err.message)
    return res.status(500).send({ error: 'internal server error' })
  }
}

const asyncWrapper = fct => (req, res) => {
  fct(req, res).then()
}

module.exports = {
  classicLogin: asyncWrapper(classicLogin),
  facebookLogin: asyncWrapper(facebookLogin),
  googleLogin: asyncWrapper(googleLogin)
}
