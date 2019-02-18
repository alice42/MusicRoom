const md5 = require("blueimp-md5");

const findUserBy = (key, value, database) => {
  return new Promise((resolve, reject) => {
    database
      .ref("users")
      .orderByChild(key)
      .equalTo(value)
      .on("value", snapshot => {
        resolve(snapshot.exists() ? snapshot.val() : false);
      });
  });
};

const isUserExists = (email, database) => {
  return database
    .ref(`users/${md5(email)}`)
    .once("value")
    .then(snapshot => {
      return snapshot.exists() ? snapshot.val() : false;
    });
  // return new Promise((resolve, reject) => {
  //   database
  //     .ref("users")
  //     .orderByChild('email')
  //     .equalTo(email)
  //     .on("value", snapshot => {
  //       resolve(snapshot.exists() ? Object.values(snapshot.val())[0] : false);
  //     });
  // });
};

const updatetUser = (payload, database) => {
  return new Promise((resolve, reject) => {
    database.ref(`users/${md5(payload.email)}`).update(payload, err => {
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
    database.ref(`users/${md5(payload.email)}`).set(payload, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  findUserBy,
  isUserExists,
  updatetUser,
  insertUser
};
