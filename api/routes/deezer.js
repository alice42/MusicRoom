const express = require("express");
const router = express.Router();

// const musicRoomDeezerAppToken = "";

const isDeezerTokenValid = userToken => {
  // const appToken = musicRoomFacebookAppToken;
  const url = `https://api.deezer.com/user/me?access_token=${userToken}`;
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("RESP DEEZER ME RESPONSE", json);
      return false;
    });
};

const createPlaylist = title => {
  const body = { title };
  const url = `https://api.deezer.com/user/me/playlists`;
  return fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("RESP DEEZER CREATE PLAYLIST", json);
      return false;
      // return !json.data.error;
    });
};

const addSongToPlaylist = (trackIds = [], playlistId) => {
  const body = { songs: trackIds.join(",") };
  const url = `https://api.deezer.com/playlist/${playlistId}/tracks`;
  return fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("RESP DEEZER ADD SONG TO PLAYLIST", json);
      return false;
      // return !json.data.error;
    });
};

module.exports = router;
