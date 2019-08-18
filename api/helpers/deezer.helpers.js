const isDeezerTokenValid = userToken => {
  // const appToken = musicRoomFacebookAppToken;
  const url = `https://api.deezer.com/user/me?access_token=${userToken}`;
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(json => (json.error ? false : json));
};

const createNewPlaylist = (title, deezerToken, deezerId) => {
  // const appToken = musicRoomFacebookAppToken;
  const url = `https://api.deezer.com/user/${deezerId}/playlists?access_token=${deezerToken}&request_method=post&title=${title}`;
  return fetch(url).then(response => {
    return response.json();
  });
  // .then(json => {
  //   return json;
  // });
};

const getPlaylistTracks = (id, deezerToken) => {
  // const appToken = musicRoomFacebookAppToken;
  const url = `https://api.deezer.com/playlist/${id}?access_token=${deezerToken}`;

  return fetch(url).then(response => {
    return response.json();
  });
  // .then(json => {
  //   return json;
  // });
};

const addTrackToPlaylist = (trackId, playlistId, token) => {
  const songs = trackId;
  const url = `https://api.deezer.com/playlist/${playlistId}/tracks?access_token=${token}&request_method=post&songs=${songs}`;
  return fetch(url).then(response => {
    return response.json();
  });
  // .then(json => {
  //   return false;
  //   // return !json.data.error;
  // });
};

module.exports = {
  isDeezerTokenValid,
  createNewPlaylist,
  getPlaylistTracks,
  addTrackToPlaylist
};