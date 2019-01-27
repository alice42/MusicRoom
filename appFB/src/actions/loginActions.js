//APP
//login
export function loginRequest(email, password) {
  return {
    type: "LOGIN_REQUEST",
    email,
    password
  };
}

export function loginSuccess({ token, user }) {
  return {
    type: "LOGIN_SUCCESS",
    token,
    user
  };
}

export function loginFailure(err) {
  return {
    type: "LOGIN_FAILURE",
    err
  };
}

//signin
export function signinRequest(email, password) {
  return {
    type: "SIGNIN_REQUEST",
    email,
    password
  };
}
export function signinSuccess() {
  return {
    type: "SIGNIN_SUCCESS",
    token,
    user
  };
}

export function signinFailure(err) {
  return {
    type: "SIGNIN_FAILURE",
    err
  };
}

//LOGOUT
export function logout() {
  return {
    type: "LOGOUT"
  };
}
