const isDeezerTokenValid = userToken => {
  // const appToken = musicRoomFacebookAppToken;
  const url = `https://api.deezer.com/user/me?access_token=${userToken}`;
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("RESP DEEZER ME RESPONSE", json);
      return false;
    });
};

module.exports = {
  isDeezerTokenValid
};
