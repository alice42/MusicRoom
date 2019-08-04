const getSessions = database => {
  return new Promise((resolve, reject) => {
    database.ref("sessions").on("value", snapshot => {
      resolve(snapshot.exists() ? snapshot.val() : {});
    });
  });
};

const addSession = (database, payload) => {
  return new Promise((resolve, reject) => {
    database.ref(`sessions`).update(payload, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getSessions,
  addSession
};
