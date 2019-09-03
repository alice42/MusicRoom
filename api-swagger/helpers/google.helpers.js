const isGoogleTokenValid = userToken => {
  const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${userToken}`;
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return !json.error;
    });
};

module.exports = {
  isGoogleTokenValid
};
