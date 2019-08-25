const getPlaylistData = (id, idCorrespondance) => playlist => {
  return {
    id: playlist._id,
    name: playlist.name,
    privacy: playlist.privacy,
    canEdit: playlist.owner === id,
    playlistId: playlist.playlistId,
    allowedUsers: (playlist.allowedUsers || []).map(
      id => idCorrespondance[id].email
    )
  };
};

const getPlaylistAvailable = (playlists, id, idCorrespondance) => {
  const rt = playlists
    .filter(playlist =>
      playlist.privacy === "private" &&
      !(
        playlist.owner === id ||
        (playlist.allowedUsers || []).indexOf(id) !== -1
      )
        ? false
        : true
    )
    .map(getPlaylistData(id, idCorrespondance));
  return rt;
};

module.exports = {
  getPlaylistData,
  getPlaylistAvailable
};
