const musicRoomFacebookAppToken = "990282421183049|pEUqJqsDhY8JHFIeeLKkqmE1vfI";

const isFacebookTokenValid = userToken => {
  const appToken = musicRoomFacebookAppToken;
  const url = `https://graph.facebook.com/debug_token?input_token=${userToken}&access_token=${appToken}`;
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return !json.data.error;
    });
};

module.exports = {
  isFacebookTokenValid
};
