const express = require('express')
const { findKey } = require('lodash')
const router = express.Router()
const md5 = require('blueimp-md5')
const {
  sendEmail,
  mailRecover,
  mailWelcome,
  mailNewPassword,
  mailAccountValid
} = require('../helpers/mail.helpers')
const {
  findUserBy,
  isUserExists,
  updatetUser,
  insertUser
} = require('../helpers/firebaseUsers.helpers')
const { isFacebookTokenValid } = require('../helpers/facebook.helpers')
const { isGoogleTokenValid } = require('../helpers/google.helpers')

const sessions = {}

const createHash = () =>
  [...Array(36)].map(() => Math.random().toString(36)[3]).join('')

const createSession = email => {
  const sessionId = sessions[email] ? sessions[email] : createHash()
  sessions[email] = sessionId
  return sessionId
}

const checkEmail = email => {
  if (0) {
    throw Error('email issue')
  }
}

const checkPassword = password => {
  if (0) {
    throw Error('password issue')
  }
}

// login classic ( email, password )
router.post('/log-in', async (req, res) => {
  try {
    const database = res.database
    const { email, password } = req.body

    const user = await isUserExists(email, database)
    if (user) {
      if (typeof user.tokenValidation === 'string') {
        return res.status(403).send({ error: 'account needs to be activated' })
      }
      if (user.password === md5(password)) {
        const sessionId = createSession(email)
        return res.status(200).send({
          sessionId,
          user: {
            email,
            name: 'Nom',
            firstname: 'Prenom',
            tags: [],
            avatarUri:
              'https://pay.google.com/about/static/images/social/knowledge_graph_logo.png',
            deezer: false,
            facebook: false,
            google: false
          }
        })
      } else {
        return res.status(403).send({ error: 'bad credentials' })
      }
    } else {
      return res.status(403).send({ error: 'bad credentials' })
    }
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

// @TODO CHECK MAIL
// @TODO REGISTER WITH FACEBOOK INFO, token or whatever
// login via facebook ( email, userToken )
// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow#checktoken
router.post('/facebook-log-in', async (req, res) => {
  try {
    const database = res.database
    const { email, userToken } = req.body

    const facebookTokenValid = await isFacebookTokenValid(userToken)
    if (!facebookTokenValid) {
      return res.status(403).send({ error: 'error with token' })
    }
    const user = await isUserExists(email, database)
    if (!user) {
      payload = {
        email,
        facebookToken: facebookTokenValid,
        signInType: 'facebook'
      }
      await insertUser(payload, database)
    }
    const sessionId = createSession(email)
    return res.status(200).send({ sessionId })
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

// login via google ( to define )
// https://developers.google.com/identity/sign-in/web/backend-auth
router.post('/google-log-in', async (req, res) => {
  try {
    const database = res.database
    const { email, userToken } = req.body

    const googleTokenValid = await isGoogleTokenValid(userToken)
    if (!googleTokenValid) {
      return res.status(403).send({ error: 'error with token' })
    }
    const user = await isUserExists(email, database)
    if (!user) {
      payload = {
        email,
        googleToken: googleTokenValid,
        signInType: 'google'
      }
      await insertUser(payload, database)
    }
    const sessionId = createSession(email)
    return res.status(200).send({ sessionId })
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

// recover account ( email )
router.post('/recover', async (req, res) => {
  try {
    const { email } = req.body
    const database = res.database
    const user = await isUserExists(email, database)
    if (user && user.signInType === 'classic') {
      const tokenPassword = `${md5(email)}${createHash()}`
      await updatetUser({ email, tokenPassword }, database)
      await sendEmail(mailRecover({ email, tokenPassword }), res.mail)
    }
    return res.status(200).send({
      message:
        'if there is an account with this email, you will receive a mail to reconnect you'
    })
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

// respond new password ( token )
router.get('/new-password', async (req, res) => {
  try {
    const { token } = req.query
    const database = res.database
    const user = await findUserBy('tokenPassword', token, database)
    if (user) {
      const { email } = Object.values(user)[0]
      const newPassword = createHash()
      await updatetUser(
        {
          email,
          tokenPassword: null,
          tokenValidation: null,
          password: md5(newPassword)
        },
        database
      )
      await sendEmail(
        mailNewPassword({ email, password: newPassword }),
        res.mail
      )
    }
    return res.status(200).send()
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

// signin classic ( email, password )
router.post('/sign-in', async (req, res) => {
  try {
    const database = res.database
    const { email, password } = req.body
    const tokenValidation = `${md5(email)}${createHash()}`
    checkEmail(email)
    checkPassword(password)

    const user = await isUserExists(email, database)
    if (user) {
      return res.status(409).send({ error: 'mail already used' })
    }
    const payload = {
      email,
      password: md5(password),
      tokenValidation,
      signInType: 'classic'
    }
    await insertUser(payload, database)
    await sendEmail(mailWelcome({ email, tokenValidation }), res.mail)
    return res
      .status(200)
      .send({ message: 'account created, waiting for mail confirmation' })
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

// account validation ( token )
router.get('/account-validation', async (req, res) => {
  try {
    const { token } = req.query
    const database = res.database
    const user = await findUserBy('tokenValidation', token, database)
    if (user) {
      const { email } = Object.values(user)[0]
      await updatetUser({ email, tokenValidation: null }, database)
      await sendEmail(mailAccountValid({ email }), res.mail)
      return res.status(200).send()
    }
    return res.status(400).send({ error: 'no user found with this token' })
    // throw Error("not yet implemented");
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

// set new password ( key, pass, passAgain )
router.post('/new-password', async (req, res) => {
  try {
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

// set new information ( key, informations )
router.post('/update-data', async (req, res) => {
  try {
    const allowedKey = ['name', 'surname', 'tags', 'avatarUri']
    const { token, toChange, newValue } = req.body
    console.log({ token, toChange, newValue })
    const email = findKey(sessions, token)
    if (!email) {
      return res.status(500).send({ error: 'token not valid' })
    }
    const database = res.database
    // not needed
    // const user = await findUserBy("mail", userMail, database);
    // if (!user) {
    //   return res.status(500).send({ error: "user not found" });
    // }
    // const { email } = Object.values(user)[0];
    console.log({
      email,
      [toChange]: newValue
    })
    await updatetUser(
      {
        email,
        [toChange]: newValue
      },
      database
    )
    return res.status(200).send()
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

// link account ( key, deezer/facebook/google)
router.post('/link-account', async (req, res) => {
  try {
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

// unlink account ( key, deezer/facebook/google )
router.post('/unlink-account', async (req, res) => {
  try {
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

module.exports = router
