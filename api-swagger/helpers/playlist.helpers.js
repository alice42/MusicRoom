const getPlaylistData = (id, idCorrespondance) => playlist => {
  return {
    id: playlist._id,
    name: playlist.name,
    canEdit: playlist.owner === id,
    canInteract: canInteract(id, playlist.editability),
    playlistId: playlist.playlistId,
    visibility: {
      privacy: playlist.visibility.privacy,
      allowedUsers: (playlist.visibility.allowedUsers || []).map(
        id => idCorrespondance[id].email
      )
    },
    editability: {
      privacy: playlist.editability.privacy,
      allowedUsers: (playlist.editability.allowedUsers || []).map(
        id => idCorrespondance[id].email
      )
    }
  };
};

const canInteract = (id, editability) => {
  return (
    editability.privacy === "public" ||
    (editability.allowedUsers || []).find(id)
  );
};

const getPlaylistAvailable = (playlists, id, idCorrespondance) => {
  const rt = playlists
    .filter(playlist =>
      playlist.visibility.privacy === "private" &&
      !(
        playlist.owner === id ||
        (playlist.visibility.allowedUsers || []).indexOf(id) !== -1 ||
        (playlist.editability.allowedUsers || []).indexOf(id) !== -1
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
