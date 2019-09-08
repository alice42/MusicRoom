const {
  findUserBy,
  getAllUsers
} = require("../../helpers/firebaseUsers.helpers");
const {
  findEvents,
  insertEvent,
  updateEvent,
  findEventBy,
  deleteEvent
} = require("../../helpers/firebaseEvents.helpers");
const { getSessions } = require("../../helpers/firebaseSession.helpers");
const { findKey } = require("lodash");
const {
  isDeezerTokenValid,
  createNewPlaylist,
  getPlaylistTracks,
  addTrackToPlaylist,
  removeTrackToPlaylist,
  setPlaylistToCollaborative
} = require("../../helpers/deezer.helpers");
const md5 = require("blueimp-md5");

const measureDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6378.137;
  const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000;
};

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
        const [a, b] = location.split(" ");
        const [x, y] = event.restriction.location.split(" ");
        if (measureDistance(a, b, x, y) > event.restriction.maxDistance) {
          return false;
        }
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

const getValuesFromParams = obj => {
  const copy = { ...obj };
  for (var key in copy) {
    copy[key] = copy[key].value;
  }
  return copy;
};
async function getEvents(req, res) {
  try {
    const database = res.database;
    const { "X-SessionID": token, location } = getValuesFromParams(
      req.swagger.params
    );
    if (!location) {
      return res
        .status(500)
        .send({ error: "you must give your location to use this feature" });
    }
    const sessions = await getSessions(database);
    const id = findKey(sessions, sessionToken => sessionToken === token);
    if (!id) {
      return res.status(500).send({ error: "token not valid" });
    }
    const { token: userTokens } = await findUserBy("_id", id, database);
    if (!userTokens || !userTokens.deezer) {
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
}

async function createEvent(req, res) {
  try {
    const database = res.database;
    const { name, location } = req.body;
    const { "X-SessionID": token } = getValuesFromParams(req.swagger.params);
    if (!location) {
      return res
        .status(500)
        .send({ error: "you must give your location to use this feature" });
    }
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
    await setPlaylistToCollaborative(playlist.id, userTokens.deezer);

    await insertEvent(database, {
      name,
      owner: id,
      privacy: "public",
      allowedUsers: [],
      playlistId: playlist.id,
      votes: { "0_0": 0 },
      restriction: {
        isRestricted: false,
        location,
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
}

async function deleteEventMTV(req, res) {
  try {
    const database = res.database;
    const { eventId, location } = req.body;
    const { "X-SessionID": token } = getValuesFromParams(req.swagger.params);
    if (!location) {
      return res
        .status(500)
        .send({ error: "you must give your location to use this feature" });
    }
    const sessions = await getSessions(database);
    const id = findKey(sessions, sessionToken => sessionToken === token);
    if (!id) {
      return res.status(500).send({ error: "token not valid" });
    }
    const { owner } = await findEventBy(database, "_id", eventId);
    if (owner !== id) {
      return res
        .status(500)
        .send({ error: "you are not authorized to delete this event" });
    }
    const { _id, token: userTokens } = await findUserBy("_id", id, database);
    const validToken = await isDeezerTokenValid(userTokens.deezer);
    if (!validToken) {
      return res.status(500).send({ error: "your token deezer is invalid" });
    }
    await deleteEvent(database, eventId);
    const events = await findEvents(database);
    const idCorrespondance = await getAllUsers(database);
    return res
      .status(200)
      .send(getEventsAvailable(events, location, id, idCorrespondance));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
}

async function updateData(req, res) {
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
    const { eventId, toChange, newValue, location } = req.body;
    const { "X-SessionID": token } = getValuesFromParams(req.swagger.params);
    if (!location) {
      return res
        .status(500)
        .send({ error: "you must give your location to use this feature" });
    }
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
}

async function getTracks(req, res) {
  try {
    const database = res.database;
    const { "X-SessionID": token, playlistId } = getValuesFromParams(
      req.swagger.params
    );
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

    return res.status(200).send(getTracksWithVotes(tracks.tracks.data, votes));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
}

async function addTrack(req, res) {
  try {
    const database = res.database;
    const { playlistId, trackId } = req.body;
    const { "X-SessionID": token } = getValuesFromParams(req.swagger.params);

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

    return res.status(200).send(getTracksWithVotes(tracks.tracks.data, votes));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
}

async function voteTrack(req, res) {
  try {
    const database = res.database;
    const { eventId, trackId, value } = req.body;
    const { "X-SessionID": token } = getValuesFromParams(req.swagger.params);
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
    return res
      .status(200)
      .send(getTracksWithVotes(tracks.tracks.data, newVotes));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
}

async function removeTrack(req, res) {
  try {
    const database = res.database;
    const { playlistId, trackId } = req.body;
    const { "X-SessionID": token } = getValuesFromParams(req.swagger.params);

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
    await removeTrackToPlaylist(trackId, playlistId, userTokens.deezer);

    const tracks = await getPlaylistTracks(playlistId, userTokens.deezer);
    const { votes } = await findEventBy(database, "playlistId", playlistId);

    return res.status(200).send(getTracksWithVotes(tracks.tracks.data, votes));
  } catch (err) {
    console.log("INTER ERROR", err.message);
    return res.status(500).send({ error: "internal server error" });
  }
}

const asyncWrapper = fct => (req, res) => {
  fct(req, res).then();
};

module.exports = {
  getEvents: asyncWrapper(getEvents),
  createEvent: asyncWrapper(createEvent),
  deleteEvent: asyncWrapper(deleteEventMTV),
  updateData: asyncWrapper(updateData),
  getTracks: asyncWrapper(getTracks),
  addTrack: asyncWrapper(addTrack),
  voteTrack: asyncWrapper(voteTrack),
  removeTrack: asyncWrapper(removeTrack)
};