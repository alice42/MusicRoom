export const updateMethod = ({ token, email, toChange, newValue }) => {
  const err = null;
  if (toChange === "name") {
    user.name = newValue;
  } else if (toChange === "firstname") {
    user.firstname = newValue;
  } else if (toChange === "email") {
    user.email = newValue;
  } else if (toChange === "avatarUri") {
    user.avatarUri = newValue;
  } else if (toChange === "tags") {
    user.tags = newValue;
  } else {
    err = "Something went wrong";
  }
  const reponse = {
    user,
    err
  };
  return response;
};
