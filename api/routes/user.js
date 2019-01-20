const express = require("express");
const router = express.Router();
const md5 = require("blueimp-md5");
const sessions = {};

const createHash = () =>
  [...Array(36)].map(() => Math.random().toString(36)[3]).join("");

const createSession = email => {
  const sessionId = sessions[email] ? sessions[email] : createHash();
  sessions[email] = sessionId;
  console.log(sessions);
  return sessionId;
};

const isUserExists = (email, database) => {
  return database
    .ref(`users/${md5(email)}`)
    .once("value")
    .then(snapshot => {
      return snapshot.exists() ? snapshot.val() : false;
    });
};

const insertUser = (payload, database) => {
  return new Promise((resolve, reject) => {
    database.ref(`users/${md5(payload.email)}`).set(payload, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const isGoogleTokenValid = userToken => {
  const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${userToken}`;
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("calling", url);
      console.log("RESP", json);
      return false;
    });
};

const isFacebookTokenValid = (userToken, appToken) => {
  const url = `https://graph.facebook.com/debug_token?
     input_token=${userToken}
     &access_token=${appToken}`;
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("RESP", json);
      return !json.error;
    });
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
router.get("/log-in", async (req, res) => {
  try {
    const database = res.database;
    const { email, password } = req.query;

    const user = await isUserExists(email, database);
    if (user) {
      if (user.password === md5(password)) {
        const sessionId = createSession(email);
        return res.status(200).send({ sessionId });
      } else {
        return res.status(403).send({ error: "bad credentials" });
      }
    } else {
      return res.status(403).send({ error: "bad credentials" });
    }
  } catch (err) {
    console.log("INTER ERROR", err);
    return res.status(500).send({ error: "internal server error" });
  }
});

// login via facebook ( email, appToken, userToken )
// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow#checktoken
router.get("/facebook-log-in", async (req, res) => {
  try {
    const database = res.database;
    const { email, appToken, userToken } = req.query;

    const facebookTokenValid = await isFacebookTokenValid(userToken, appToken);
    if (!facebookTokenValid) {
      return res.status(403).send({ error: "error with token" });
    }
    const user = await isUserExists(email, database);
    if (!user) {
      payload = {
        email
        // facebookId: null
      };
      await insertUser(payload, database);
    }
    const sessionId = createSession(email);
    return res.status(200).send({ sessionId });
  } catch (err) {
    console.log("INTER ERROR", err);
    return res.status(500).send({ error: "internal server error" });
  }
});

// login via google ( to define )
// https://developers.google.com/identity/sign-in/web/backend-auth
router.get("/google-log-in", async (req, res) => {
  try {
    const database = res.database;
    const { email, userToken } = req.query;

    const googleTokenValid = await isGoogleTokenValid(userToken);
    if (!googleTokenValid) {
      return res.status(403).send({ error: "error with token" });
    }
    const user = await isUserExists(email, database);
    if (!user) {
      payload = {
        email
        // googleId: null
      };
      await insertUser(payload, database);
    }
    const sessionId = createSession(email);
    return res.status(200).send({ sessionId });
  } catch (err) {
    console.log("INTER ERROR", err);
    return res.status(500).send({ error: "internal server error" });
  }
});

// recover account ( email )
router.get("/recover", async (req, res) => {
  try {
  } catch (err) {
    console.log("INTER ERROR", err);
    return res.status(500).send({ error: "internal server error" });
  }
});

// signin classic ( email, password )
router.post("/sign-in", async (req, res) => {
  try {
    const database = res.database;
    const { email, password } = req.body;

    checkEmail(email);
    checkPassword(password);

    const user = await isUserExists(email, database);
    if (user) {
      return res.status(409).send({ error: "mail already used" });
    }
    const payload = {
      email,
      password: md5(password)
    };
    await insertUser(payload, database);
    // send mail
    return res
      .status(200)
      .send({ message: "account created, waiting for mail confirmation" });
  } catch (err) {
    console.log("INTER ERROR", err);
    return res.status(500).send({ error: "internal server error" });
  }
});

// set new password ( key, pass, passAgain )
router.post("/new-password", async (req, res) => {
  try {
  } catch (err) {
    console.log("INTER ERROR", err);
    return res.status(500).send({ error: "internal server error" });
  }
});

// set new information ( key, informations )
router.post("/update-data", async (req, res) => {
  try {
  } catch (err) {
    console.log("INTER ERROR", err);
    return res.status(500).send({ error: "internal server error" });
  }
});

// link account ( key, deezer/facebook/google)
router.post("/link-account", async (req, res) => {
  try {
  } catch (err) {
    console.log("INTER ERROR", err);
    return res.status(500).send({ error: "internal server error" });
  }
});

// unlink account ( key, deezer/facebook/google )
router.get("/unlink-account", async (req, res) => {
  try {
  } catch (err) {
    console.log("INTER ERROR", err);
    return res.status(500).send({ error: "internal server error" });
  }
});

module.exports = router;
