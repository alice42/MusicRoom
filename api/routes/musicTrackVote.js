const express = require("express");
const router = express.Router();
const { findUserBy } = require("../helpers/firebaseUsers.helpers");
const {
  findEvents,
  insertEvent,
  updateEvent,
  findEventBy
} = require("../helpers/firebaseEvents.helpers");
const { getSessions } = require("../helpers/firebaseSession.helpers");
const { findKey } = require("lodash");
const { isDeezerTokenValid } = require("../helpers/deezer.helpers");

const getEventsAvailable = (events, location, id) => {
  return events
    .filter(event => {
      if (
        event.privacy === "private" &&
        event.allowedUsers.indexOf(id) === -1
      ) {
        return false;
      }
      return true;
    })
    .map(getEventData(id));
};

const getEventData = id => event => {
  return {
    id: event._id,
    name: event.name,
    privacy: event.privacy,
    canEdit: event._id === id
  };
};

router.post("/get-events", async (req, res) => {
  try {
    const database = res.database;
    const { token, location } = req.body;
    const sessions = await getSessions(database);
    const id = findKey(sessions, sessionToken => sessionToken === token);
    if (!id) {
      return res.status(500).send({ error: "token not valid" });
    }
    const { token: userTokens } = await findUserBy("_id", id, database);
    if (!userTokens.deezer) {
      return res
        .status(500)
        .send({ error: "you dont have link your account to deezer" });
    }
    const validToken = await isDeezerTokenValid(userTokens.deezer);
    if (!validToken) {
      return res.status(500).send({ error: "your token deezer is invalid" });
    }
    const events = await findEvents(database);
    return res.status(200).send(getEventsAvailable(events, location, id));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

router.post("/create-event", async (req, res) => {
  try {
    const database = res.database;
    const { token, name, location } = req.body;
    const sessions = await getSessions(database);
    const id = findKey(sessions, sessionToken => sessionToken === token);
    if (!id) {
      return res.status(500).send({ error: "token not valid" });
    }
    const { _id } = await findUserBy("_id", id, database);
    await insertEvent(database, {
      name,
      owner: id,
      privacy: "public",
      allowedUsers: [id]
    });
    const events = await findEvents(database);
    return res.status(200).send(getEventsAvailable(events, location, id));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

// set new information ( key, informations )
router.post("/update-data", async (req, res) => {
  try {
    const database = res.database;
    const allowedKey = ["name", "privacy"];
    const { token, eventId, toChange, newValue, location } = req.body;
    console.log(location, req.ip.split(`:`).pop());
    console.log({ token, eventId, toChange, newValue });
    const sessions = await getSessions(database);
    const id = findKey(sessions, sessionToken => sessionToken === token);
    if (!id) {
      return res.status(500).send({ error: "token not valid" });
    }
    const { owner } = await findEventBy(database, "_id", eventId);
    if (owner !== id) {
      return res
        .status(500)
        .send({ error: "you are not authorized to edit this event" });
    }
    if (allowedKey.indexOf(toChange) === -1) {
      return res
        .status(500)
        .send({ error: "you cant change this information" });
    }
    await updateEvent(database, eventId, { [toChange]: newValue });
    const events = await findEvents(database);
    return res.status(200).send(getEventsAvailable(events, location, id));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

module.exports = router;
