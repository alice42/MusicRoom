const createHash = () =>
  [...Array(36)].map(() => Math.random().toString(36)[3]).join("");

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

const createSession = async (database, id) => {
  const sessions = await getSessions(database);
  const sessionId = sessions[id] ? sessions[id] : createHash();
  addSession(database, { [id]: sessionId });
  return sessionId;
};

module.exports = {
  getSessions,
  addSession,
  createSession
};
