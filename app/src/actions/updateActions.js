///////////////UPDATE///////////////////
//REQUEST
export function updateRequest(newValue, user, toChange) {
  return {
    type: "UPDATE_REQUEST",
    newValue,
    user,
    toChange
  };
}
//DEEZER

export function deezerGetTokenSuccess(token) {
  return {
    type: "DEEZER_GET_TOKEN_SUCCESS",
    token
  };
}

//FACEBOOK
export function linkFacebookRequest() {
  return {
    type: "LOGIN_FACEBOOK_REQUEST"
  };
}

//GOOGLE
export function linkGoogleRequest() {
  return {
    type: "LOGIN_GOOGLE_REQUEST"
  };
}
