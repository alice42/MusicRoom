const { findKey } = require("lodash");
const md5 = require("blueimp-md5");
const {
  sendEmail,
  mailRecover,
  mailWelcome,
  mailNewPassword,
  mailAccountValid
} = require("../../helpers/mail.helpers");
const {
  findUserBy,
  updatetUser,
  insertUser,
  updatetUserNode,
  getProfileData,
  getAllUsers
} = require("../../helpers/firebaseUsers.helpers");
const { getSessions } = require("../../helpers/firebaseSession.helpers");

const createHash = () =>
  [...Array(36)].map(() => Math.random().toString(36)[3]).join("");

const getValuesFromParams = obj => {
  const copy = { ...obj };
  for (var key in copy) {
    copy[key] = copy[key].value;
  }
  return copy;
};

async function recover(req, res) {
  try {
    const { email: userMail } = req.body;
    const email = userMail.toLowerCase();

    const database = res.database;
    const user = await findUserBy("email", email, database);
    if (user) {
      const tokenPassword = `${md5(email)}${createHash()}`;
      await updatetUser(user._id, { email, tokenPassword }, database);
      await sendEmail(mailRecover({ email, tokenPassword }), res.mail);

      return res.status(200).send({
        message:
          "if there is an account with this email, you will receive a mail to reconnect you"
      });
    } else {
      return res.status(403).send({
        message: "No account found"
      });
    }
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
}

// respond new password ( token )
async function newPassword(req, res) {
  try {
    const { token } = req.query;
    const database = res.database;
    const user = await findUserBy("tokenPassword", token, database);
    if (user) {
      const { email } = user;
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
      return res.status(200).send({
        message: "Password reset. A new password was send to your mail."
      });
    } else {
      return res.status(403).send({
        message: "No account found"
      });
    }

  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
}

// signin classic ( email, password )
async function signIn(req, res) {
  try {
    const database = res.database;
    const { email: userMail, password } = req.body;
    const email = userMail.toLowerCase();

    const tokenValidation = `${md5(email)}${createHash()}`;

    const user = await findUserBy("email", email, database);
    if (user) {
      return res.status(409).send({ error: "mail already used" });
    }
    const payload = {
      email,
      token: { chat: "croute" },
      signInType: "classic",
      password: md5(password),
      tokenValidation
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
}

// account validation ( token )
async function accountValidation(req, res) {
  try {
    const { token } = req.query;
    const database = res.database;
    const user = await findUserBy("tokenValidation", token, database);
    if (user) {
      const { email } = user;
      await updatetUser(user._id, { email, tokenValidation: null }, database);
      await sendEmail(mailAccountValid({ email }), res.mail);
      return res.status(200).send({ message: "Account Validated!" });
    }
    return res.status(403).send({ error: "no user found with this token" });
    // throw Error("not yet implemented");
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
}

// set new information ( key, informations )
async function updateData(req, res) {
  try {
    const database = res.database;
    const allowedKey = [
      "email",
      "name",
      "firstname",
      "tags",
      "friends",
      "avatarUri"
    ];
    const { toChange, newValue } = req.body;
    const { "X-SessionID": token } = getValuesFromParams(req.swagger.params);

    if (allowedKey.indexOf(toChange) === -1) {
      return res
        .status(403)
        .send({ error: "you cant change this information" });
    }
    const sessions = await getSessions(database);
    const id = findKey(sessions, sessionToken => sessionToken === token);
    if (!id) {
      return res.status(401).send({ error: "token not valid" });
    }
    const debug = await findUserBy("_id", id, database);
    const { _id } = debug;
    if (toChange === "friends") {
      let usersId;
      try {
        usersIdPromises = (newValue === "" ? [] : newValue.split(",")).map(
          async userMail => {
            const { _id } = await findUserBy(
              "email",
              userMail.toLowerCase(),
              database
            );
            if (_id === undefined) throw Error("user doesnt exist");
            return _id;
          }
        );
        usersId = await Promise.all(usersIdPromises);
        usersIdUniq = [...new Set(usersId)];
      } catch (userError) {
        return res.status(403).send({ error: "a user given doesnt exist" });
      }
      await updatetUser(_id, { [toChange]: usersIdUniq }, database);
    } else {
      const obj = {
        [toChange]:
          toChange === "email"
            ? newValue.toLowerCase()
            : toChange === "tags"
              ? newValue === ""
                ? []
                : newValue.split(",")
              : newValue
      };
      await updatetUser(_id, obj, database);
    }
    const user = await findUserBy("_id", id, database);
    const idCorrespondance = await getAllUsers(database);
    return res.status(200).send(getProfileData(user, idCorrespondance));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
}

// set new information ( key, informations )
async function updatePrivacy(req, res) {
  try {
    const database = res.database;
    const allowedKey = [
      "email",
      "name",
      "firstname",
      "tags",
      "friends",
      "avatarUri",
      "networks"
    ];
    const { privacyValue, dataType } = req.body;
    const { "X-SessionID": token } = getValuesFromParams(req.swagger.params);

    if (allowedKey.indexOf(dataType) === -1) {
      return res
        .status(403)
        .send({ error: "you cant change this information" });
    }
    const sessions = await getSessions(database);
    const id = findKey(sessions, sessionToken => sessionToken === token);
    if (!id) {
      return res.status(401).send({ error: "token not valid" });
    }
    const { _id } = await findUserBy("_id", id, database);
    await updatetUserNode(
      _id,
      "privacy",
      {
        [dataType]: privacyValue
      },
      database
    );
    const user = await findUserBy("_id", id, database);
    const idCorrespondance = await getAllUsers(database);
    return res.status(200).send(getProfileData(user, idCorrespondance));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
}

// link account ( key, deezer/facebook/google)
async function linkAccount(req, res) {
  try {
    const database = res.database;
    const { type, key } = req.body;
    const { "X-SessionID": token } = getValuesFromParams(req.swagger.params);

    const allowedKey = ["facebook", "google", "deezer"];
    if (allowedKey.indexOf(type) === -1) {
      return res
        .status(403)
        .send({ error: "you cant change this kind of account" });
    }
    const sessions = await getSessions(database);
    const id = findKey(sessions, sessionToken => sessionToken === token);
    if (!id) {
      return res.status(401).send({ error: "token not valid" });
    }
    const { _id } = await findUserBy("_id", id, database);
    await updatetUserNode(_id, "token", { [type]: key }, database);
    const user = await findUserBy("_id", id, database);
    const idCorrespondance = await getAllUsers(database);
    return res.status(200).send(getProfileData(user, idCorrespondance));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
}

// unlink account ( key, deezer/facebook/google )
async function unlinkAccount(req, res) {
  try {
    const database = res.database;
    const { type } = req.body;
    const { "X-SessionID": token } = getValuesFromParams(req.swagger.params);

    const allowedKey = ["facebook", "google", "deezer"];
    if (allowedKey.indexOf(type) === -1) {
      return res
        .status(403)
        .send({ error: "you cant change this kind of account" });
    }
    const sessions = await getSessions(database);
    const id = findKey(sessions, sessionToken => sessionToken === token);
    if (!id) {
      return res.status(403).send({ error: "token not valid" });
    }
    const { _id } = await findUserBy("_id", id, database);
    await updatetUserNode(_id, "token", { [type]: false }, database);
    const user = await findUserBy("_id", id, database);
    const idCorrespondance = await getAllUsers(database);
    return res.status(200).send(getProfileData(user, idCorrespondance));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
}

const asyncWrapper = fct => (req, res) => {
  fct(req, res).then();
};

module.exports = {
  recover: asyncWrapper(recover),
  signIn: asyncWrapper(signIn),
  accountValidation: asyncWrapper(accountValidation),
  newPassword: asyncWrapper(newPassword),
  updateData: asyncWrapper(updateData),
  updatePrivacy: asyncWrapper(updatePrivacy),
  linkAccount: asyncWrapper(linkAccount),
  unlinkAccount: asyncWrapper(unlinkAccount)
};
