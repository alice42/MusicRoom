const md5 = require("blueimp-md5");

const findUserBy = (key, value, database) => {
  return new Promise((resolve, reject) => {
    database
      .ref("users")
      .orderByChild(key)
      .equalTo(value)
      .on("value", snapshot => {
        resolve(snapshot.exists() ? Object.values(snapshot.val())[0] : false);
      });
  });
};

const getAllUsers = database => {
  return new Promise((resolve, reject) => {
    database.ref("users").on("value", snapshot => {
      resolve(snapshot.exists() ? snapshot.val() : false);
    });
  });
};

const updatetUser = (id, payload, database) => {
  return new Promise((resolve, reject) => {
    database.ref(`users/${id}`).update(payload, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const updatetUserNode = (id, node, payload, database) => {
  return new Promise((resolve, reject) => {
    database.ref(`users/${id}/${node}`).update(payload, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const insertUser = (payload, database) => {
  return new Promise((resolve, reject) => {
    const _id = md5(payload.email + new Date().getTime());
    database.ref(`users/${_id}`).set({ _id, ...payload }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const getProfileData = user => {
  return {
    email: user.email,
    name: user.name || "",
    firstname: user.firstname || "",
    avatarUri: user.avatarUri || "",
    privacy: user.privacy || {},
    tags: user.tags || [],
    friends: user.friends || [],
    deezer: !!(user.token || {}).deezer,
    facebook: !!(user.token || {}).facebook,
    google: !!(user.token || {}).google
  };
};

module.exports = {
  findUserBy,
  updatetUser,
  updatetUserNode,
  insertUser,
  getAllUsers,
  getProfileData
};
