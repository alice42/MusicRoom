const md5 = require("blueimp-md5");

const findEvents = database => {
  return new Promise((resolve, reject) => {
    database.ref("events").on("value", snapshot => {
      resolve(snapshot.exists() ? Object.values(snapshot.val()) : []);
    });
  });
};

const insertEvent = (database, payload) => {
  return new Promise((resolve, reject) => {
    const _id = md5(payload.name + new Date().getTime());
    database.ref(`events/${_id}`).set({ _id, ...payload }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const findEventBy = (database, key, value) => {
  return new Promise((resolve, reject) => {
    database
      .ref("events")
      .orderByChild(key)
      .equalTo(value)
      .on("value", snapshot => {
        resolve(snapshot.exists() ? Object.values(snapshot.val())[0] : false);
      });
  });
};

const updateEvent = (database, id, payload) => {
  return new Promise((resolve, reject) => {
    database.ref(`events/${id}`).update(payload, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const deleteEvent = (database, id) => {
  return new Promise((resolve, reject) => {
    database.ref(`events/${id}`).remove(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  findEvents,
  insertEvent,
  findEventBy,
  updateEvent,
  deleteEvent
};
