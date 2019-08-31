const express = require("express");
const { findKey } = require("lodash");
const router = express.Router();
const md5 = require("blueimp-md5");
const { database } = require("../app");
const {
  sendEmail,
  mailRecover,
  mailWelcome,
  mailNewPassword,
  mailAccountValid
} = require("../helpers/mail.helpers");
const {
  findUserBy,
  updatetUser,
  insertUser,
  updatetUserNode
} = require("../helpers/firebaseUsers.helpers");
const {
  getSessions,
  addSession
} = require("../helpers/firebaseSession.helpers");
const { isFacebookTokenValid } = require("../helpers/facebook.helpers");
const { isGoogleTokenValid } = require("../helpers/google.helpers");

const getProfileData = user => {
  return {
    email: user.email,
    name: user.name || null,
    firstname: user.firstname || null,
    avatarUri: user.avatarUri || null,
    privacy: user.privacy || {},
    tags: user.tags || [],
    deezer: !!(user.token || {}).deezer,
    facebook: !!(user.token || {}).facebook,
    google: !!(user.token || {}).google
  };
};

const createHash = () =>
  [...Array(36)].map(() => Math.random().toString(36)[3]).join("");

const createSession = async (database, id) => {
  const sessions = await getSessions(database);
  const sessionId = sessions[id] ? sessions[id] : createHash();
  addSession(database, { [id]: sessionId });
  return sessionId;
};

const checkEmail = email => {
  if (0) {
    throw Error("email issue");
  }
};

const checkPassword = password => {
  if (0) {
    throw Error("password issue");
  }
};

// login classic ( email, password )
router.post("/log-in", async (req, res) => {
  try {
    const database = res.database;
    const { email: userMail, password } = req.body;
    const email = userMail.toLowerCase();

    const user = await findUserBy("email", email, database);
    if (user) {
      if (typeof user.tokenValidation === "string") {
        return res.status(403).send({ error: "account needs to be activated" });
      }
      if (user.password === md5(password)) {
        const sessionId = await createSession(database, user._id);
        return res.status(200).send({
          sessionId,
          user: getProfileData(user)
        });
      } else {
        return res.status(403).send({ error: "bad credentials" });
      }
    } else {
      return res.status(403).send({ error: "bad credentials" });
    }
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

// @TODO CHECK MAIL
// @TODO REGISTER WITH FACEBOOK INFO, token or whatever
// login via facebook ( email, userToken )
// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow#checktoken
router.post("/facebook-log-in", async (req, res) => {
  return res.status(500).send({ error: "Error test" });

  try {
    const database = res.database;
    const { email: userMail, userToken } = req.body;
    const email = userMail.toLowerCase();

    const facebookTokenValid = await isFacebookTokenValid(userToken);
    if (!facebookTokenValid) {
      return res.status(403).send({ error: "error with token" });
    }
    const user = await findUserBy("email", email, database);
    if (!user) {
      payload = {
        email,
        facebookToken: facebookTokenValid,
        signInType: "facebook"
      };
      await insertUser(payload, database);
    }
    const sessionId = await createSession(database, user._id);
    return res.status(200).send({ sessionId });
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

// login via google ( to define )
// https://developers.google.com/identity/sign-in/web/backend-auth
router.post("/google-log-in", async (req, res) => {
  try {
    const database = res.database;
    const { email: userMail, userToken } = req.body;
    const email = userMail.toLowerCase();

    const googleTokenValid = await isGoogleTokenValid(userToken);
    if (!googleTokenValid) {
      return res.status(403).send({ error: "error with token" });
    }
    const user = await findUserBy("email", email, database);
    if (!user) {
      payload = {
        email,
        googleToken: googleTokenValid,
        signInType: "google"
      };
      await insertUser(payload, database);
    }
    const sessionId = await createSession(database, user._id);
    return res.status(200).send({ sessionId });
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

// recover account ( email )
router.post("/recover", async (req, res) => {
  try {
    const { email: userMail } = req.body;
    const email = userMail.toLowerCase();

    const database = res.database;
    const user = await findUserBy("email", email, database);
    if (user && user.signInType === "classic") {
      const tokenPassword = `${md5(email)}${createHash()}`;
      await updatetUser(user._id, { email, tokenPassword }, database);
      await sendEmail(mailRecover({ email, tokenPassword }), res.mail);
    }
    return res.status(200).send({
      message:
        "if there is an account with this email, you will receive a mail to reconnect you"
    });
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

// respond new password ( token )
router.get("/new-password", async (req, res) => {
  try {
    const { token } = req.query;
    const database = res.database;
    const user = await findUserBy("tokenPassword", token, database);
    if (user) {
      const { email } = Object.values(user)[0];
      const newPassword = createHash();
      await updatetUser(
        user._id,
        {
          email,
          tokenPassword: null,
          tokenValidation: null,
          password: md5(newPassword)
        },
        database
      );
      await sendEmail(
        mailNewPassword({ email, password: newPassword }),
        res.mail
      );
    }
    return res.status(200).send();
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

// signin classic ( email, password )
router.post("/sign-in", async (req, res) => {
  try {
    const database = res.database;
    const { email: userMail, password } = req.body;
    const email = userMail.toLowerCase();

    const tokenValidation = `${md5(email)}${createHash()}`;
    checkEmail(email);
    checkPassword(password);

    const user = await findUserBy("email", email, database);
    if (user) {
      return res.status(409).send({ error: "mail already used" });
    }
    const payload = {
      email,
      password: md5(password),
      // tokenValidation, // TO AVOID MAIL CONFIRMATION
      signInType: "classic"
    };
    await insertUser(payload, database);
    await sendEmail(mailWelcome({ email, tokenValidation }), res.mail);
    return res
      .status(200)
      .send({ message: "account created, waiting for mail confirmation" });
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

// account validation ( token )
router.get("/account-validation", async (req, res) => {
  try {
    const { token } = req.query;
    const database = res.database;
    const user = await findUserBy("tokenValidation", token, database);
    if (user) {
      const { email } = Object.values(user)[0];
      await updatetUser(user._id, { email, tokenValidation: null }, database);
      await sendEmail(mailAccountValid({ email }), res.mail);
      return res.status(200).send();
    }
    return res.status(400).send({ error: "no user found with this token" });
    // throw Error("not yet implemented");
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

// set new password ( key, pass, passAgain )
router.post("/new-password", async (req, res) => {
  try {
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

// set new information ( key, informations )
router.post("/update-data", async (req, res) => {
  try {
    const database = res.database;
    const allowedKey = ["email", "name", "firstname", "tags", "avatarUri"];
    const { token, toChange, newValue } = req.body;
    if (allowedKey.indexOf(toChange) === -1) {
      return res
        .status(500)
        .send({ error: "you cant change this information" });
    }
    const sessions = await getSessions(database);
    const id = findKey(sessions, sessionToken => sessionToken === token);
    if (!id) {
      return res.status(500).send({ error: "token not valid" });
    }
    const { _id } = await findUserBy("_id", id, database);
    await updatetUser(
      _id,
      { [toChange]: toChange === "email" ? newValue.toLowerCase() : newValue },
      database
    );
    const user = await findUserBy("_id", id, database);
    return res.status(200).send(getProfileData(user));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

// set new information ( key, informations )
router.post("/update-privacy", async (req, res) => {
  try {
    const database = res.database;
    const allowedKey = [
      "email",
      "name",
      "firstname",
      "tags",
      "avatarUri",
      "networks"
    ];
    const { token, privacyValue, dataType } = req.body;
    if (allowedKey.indexOf(dataType) === -1) {
      return res
        .status(500)
        .send({ error: "you cant change this information" });
    }
    const sessions = await getSessions(database);
    const id = findKey(sessions, sessionToken => sessionToken === token);
    if (!id) {
      return res.status(500).send({ error: "token not valid" });
    }
    const { _id } = await findUserBy("_id", id, database);
    await updatetUserNode(
      _id,
      "privacy",
      { [dataType]: privacyValue },
      database
    );
    const user = await findUserBy("_id", id, database);
    return res.status(200).send(getProfileData(user));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

// link account ( key, deezer/facebook/google)
router.post("/link-account", async (req, res) => {
  const database = res.database;
  const { token, type, key } = req.body;
  const allowedKey = ["facebook", "google", "deezer"];
  if (allowedKey.indexOf(type) === -1) {
    return res
      .status(500)
      .send({ error: "you cant change this kind of account" });
  }
  const sessions = await getSessions(database);
  const id = findKey(sessions, sessionToken => sessionToken === token);
  if (!id) {
    return res.status(500).send({ error: "token not valid" });
  }
  const { _id } = await findUserBy("_id", id, database);
  await updatetUserNode(_id, "token", { [type]: key }, database);
  const user = await findUserBy("_id", id, database);
  return res.status(200).send(getProfileData(user));
  try {
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

// unlink account ( key, deezer/facebook/google )
router.post("/unlink-account", async (req, res) => {
  try {
    const database = res.database;
    const { token, type } = req.body;
    const allowedKey = ["facebook", "google", "deezer"];
    if (allowedKey.indexOf(type) === -1) {
      return res
        .status(500)
        .send({ error: "you cant change this kind of account" });
    }
    const sessions = await getSessions(database);
    const id = findKey(sessions, sessionToken => sessionToken === token);
    if (!id) {
      return res.status(500).send({ error: "token not valid" });
    }
    const { _id } = await findUserBy("_id", id, database);
    await updatetUserNode(_id, "token", { [type]: false }, database);
    const user = await findUserBy("_id", id, database);
    return res.status(200).send(getProfileData(user));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

module.exports = router;
