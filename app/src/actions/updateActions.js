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
