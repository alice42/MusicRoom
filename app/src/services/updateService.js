export const updateMethod = ({ user, newValue, toChange }) => {
  const err = null;
  if (toChange === "username") {
    user.username = newValue;
  } else if (toChange === "email") {
    user.email = newValue;
  } else if (toChange === "avatarUri") {
    user.avatarUri = newValue;
  } else if (toChange === "tags") {
    user.tags = newValue;
  } else if (toChange === "playlist") {
    user.playlists = newValue;
  } else {
    err = "Something went wrong";
  }
  const reponse = {
    user,
    err
  };
  return response;
};
