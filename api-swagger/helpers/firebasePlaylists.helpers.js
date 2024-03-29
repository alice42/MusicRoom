const md5 = require("blueimp-md5");

const findPlaylists = database => {
  return new Promise((resolve, reject) => {
    database.ref("playlists").on("value", snapshot => {
      resolve(snapshot.exists() ? Object.values(snapshot.val()) : []);
    });
  });
};

const insertPlaylist = (database, payload) => {
  return new Promise((resolve, reject) => {
    const _id = md5(payload.name + new Date().getTime());
    database.ref(`playlists/${_id}`).set({ _id, ...payload }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const updatePlaylist = (database, path, value) => {
  const key = path.pop();
  return new Promise((resolve, reject) => {
    database
      .ref(`playlists/${path.join("/")}`)
      .update({ [key]: value }, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
};

const findPlaylistBy = (database, key, value) => {
  return new Promise((resolve, reject) => {
    database
      .ref("playlists")
      .orderByChild(key)
      .equalTo(value)
      .on("value", snapshot => {
        resolve(snapshot.exists() ? Object.values(snapshot.val())[0] : false);
      });
  });
};

const deletePlaylist = (database, id) => {
  return new Promise((resolve, reject) => {
    database.ref(`playlists/${id}`).remove(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  findPlaylists,
  insertPlaylist,
  updatePlaylist,
  findPlaylistBy,
  deletePlaylist
};
