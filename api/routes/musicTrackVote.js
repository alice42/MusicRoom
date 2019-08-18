const express = require("express");
const router = express.Router();
const { findUserBy, getAllUsers } = require("../helpers/firebaseUsers.helpers");
const {
  findEvents,
  insertEvent,
  updateEvent,
  findEventBy
} = require("../helpers/firebaseEvents.helpers");
const { getSessions } = require("../helpers/firebaseSession.helpers");
const { findKey } = require("lodash");
const {
  isDeezerTokenValid,
  createNewPlaylist,
  getPlaylistTracks,
  addTrackToPlaylist
} = require("../helpers/deezer.helpers");
const md5 = require("blueimp-md5");

const getTracksWithVotes = (tracks, votes) => {
  const votesByTrack = {};
  Object.entries(votes).forEach(([id, value]) => {
    const [trackId, userId] = id.split("_");
    votesByTrack[trackId] = votesByTrack[trackId]
      ? votesByTrack[trackId] + value
      : value;
  });

  const tracksWithVote = tracks.map(track => ({
    id: track.id,
    albumCover: track.album.cover,
    artistName: track.artist.name,
    previewUrl: track.preview,
    title: track.title,
    numberOfVote: votesByTrack[track.id] ? votesByTrack[track.id] : 0
  }));
  tracksWithVote.sort((a, b) =>
    b.numberOfVote < a.numberOfVote
      ? -1
      : b.numberOfVote > a.numberOfVote
      ? 1
      : 0
  );
  //   console.log(tracksWithVote);

  return tracksWithVote;
};
const getEventsAvailable = (events, location, id, idCorrespondance) => {
  const tme = new Date().getTime();
  const rt = events
    .filter(event =>
      event.privacy === "private" &&
      !(event.owner === id || (event.allowedUsers || []).indexOf(id) !== -1)
        ? false
        : true
    )
    .filter(event => {
      if (event.owner === id) return true;
      if (event.restriction.isRestricted === true) {
        // console.log(location, event.location, event.maxDistance);
        if (tme > event.endTime || tme < event.startTime) {
          return false;
        }
        if (!location) {
          return false;
        }
      }
      return true;
    })
    .map(getEventData(id, idCorrespondance));
  //   console.log(rt);
  return rt;
};

const getEventData = (id, idCorrespondance) => event => {
  return {
    id: event._id,
    name: event.name,
    privacy: event.privacy,
    canEdit: event.owner === id,
    playlistId: event.playlistId,
    allowedUsers: (event.allowedUsers || []).map(
      id => idCorrespondance[id].email
    ),
    restriction: event.restriction
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
    const idCorrespondance = await getAllUsers(database);
    return res
      .status(200)
      .send(getEventsAvailable(events, location, id, idCorrespondance));
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
    const { _id, token: userTokens } = await findUserBy("_id", id, database);
    const validToken = await isDeezerTokenValid(userTokens.deezer);
    if (!validToken) {
      return res.status(500).send({ error: "your token deezer is invalid" });
    }
    playlist = await createNewPlaylist(
      "playlist_MTV_" + md5(name),
      userTokens.deezer,
      validToken.id
    );
    await insertEvent(database, {
      name,
      owner: id,
      privacy: "public",
      allowedUsers: [],
      playlistId: playlist.id,
      votes: { "0_0": 0 },
      restriction: {
        isRestricted: false,
        location: "",
        maxDistance: 0,
        startDate: new Date().getTime(),
        endDate: new Date().getTime()
      }
    });
    const events = await findEvents(database);
    const idCorrespondance = await getAllUsers(database);
    return res
      .status(200)
      .send(getEventsAvailable(events, location, id, idCorrespondance));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

// set new information ( key, informations )
router.post("/update-data", async (req, res) => {
  try {
    const database = res.database;
    const allowedKey = [
      "name",
      "privacy",
      "allowedUsers",
      "restriction.isRestricted",
      "restriction.startDate",
      "restriction.enDate",
      "restriction.location",
      "restriction.maxDistance"
    ];
    const { token, eventId, toChange, newValue, location } = req.body;
    // console.log(location, req.ip.split(`:`).pop());
    // console.log({ token, eventId, toChange, newValue, location });
    const sessions = await getSessions(database);
    const id = findKey(sessions, sessionToken => sessionToken === token);
    if (!id) {
      return res.status(500).send({ error: "token not valid" });
    }
    const { owner, restriction } = await findEventBy(database, "_id", eventId);
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
    if (toChange.indexOf("restriction.") === 0) {
      const restrictionKey = toChange.split("restriction.")[1];
      const newRestriction = { ...restriction, [restrictionKey]: newValue };
      //   console.log(restrictionKey, newValue);
      await updateEvent(database, eventId, { restriction: newRestriction });
    } else if (toChange === "allowedUsers") {
      let usersId;
      try {
        usersIdPromises = newValue.map(async userMail => {
          const { _id } = await findUserBy(
            "email",
            userMail.toLowerCase(),
            database
          );
          if (_id === undefined) throw Error("user doesnt exist");
          return _id;
        });
        usersId = await Promise.all(usersIdPromises);
        usersIdUniq = [...new Set(usersId)];

        // console.log(usersIdUniq);
      } catch (userError) {
        return res.status(500).send({ error: "a user given doesnt exist" });
      }
      await updateEvent(database, eventId, { [toChange]: usersIdUniq });
    } else {
      await updateEvent(database, eventId, { [toChange]: newValue });
    }
    const events = await findEvents(database);
    const idCorrespondance = await getAllUsers(database);

    return res
      .status(200)
      .send(getEventsAvailable(events, location, id, idCorrespondance));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

router.post("/get-tracks", async (req, res) => {
  try {
    const database = res.database;
    const { token, playlistId, location } = req.body;
    // console.log({ token, playlistId, location });
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

    const tracks = await getPlaylistTracks(playlistId, userTokens.deezer);
    const { votes } = await findEventBy(database, "playlistId", playlistId);

    // console.log(tracks.tracks.data);
    // const events = await findEvents(database);
    return res.status(200).send(getTracksWithVotes(tracks.tracks.data, votes));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

router.post("/add-track", async (req, res) => {
  try {
    const database = res.database;
    const { token, playlistId, trackId, location } = req.body;
    // console.log({ token, playlistId, trackId, location });

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
    await addTrackToPlaylist(trackId, playlistId, userTokens.deezer);
    const tracks = await getPlaylistTracks(playlistId, userTokens.deezer);
    const { votes } = await findEventBy(database, "playlistId", playlistId);

    // console.log(tracks.tracks.data);
    // const events = await findEvents(database);
    return res.status(200).send(getTracksWithVotes(tracks.tracks.data, votes));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

router.post("/vote-track", async (req, res) => {
  try {
    const database = res.database;
    const { token, eventId, trackId, value, location } = req.body;
    // console.log({ token, eventId, trackId, value, location });
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
    const { votes, playlistId } = await findEventBy(database, "_id", eventId);
    const newVotes = {
      ...votes,
      [`${trackId}_${id}`]: value === 1 ? 1 : value === -1 ? -1 : 0
    };
    await updateEvent(database, eventId, {
      votes: newVotes
    });

    const tracks = await getPlaylistTracks(playlistId, userTokens.deezer);
    // console.log(tracks.tracks.data);
    // const events = await findEvents(database);
    return res
      .status(200)
      .send(getTracksWithVotes(tracks.tracks.data, newVotes));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
});

module.exports = router;
