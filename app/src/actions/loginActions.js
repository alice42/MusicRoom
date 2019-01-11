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

//sign up
export function signUpRequest(email, username, password) {
  return {
    type: "SIGN_UP_REQUEST",
    email,
    username,
    password
  };
}
export function signUpLoginSuccess() {
  return {
    type: "SIGN_UP_SUCCESS",
    token,
    user
  };
}

export function signUpLoginFailure(err) {
  return {
    type: "SIGN_UP_FAILURE",
    err
  };
}

//GOOGLE
export function googleLoginRequest() {
  return {
    type: "GOOGLE_LOGIN_REQUEST"
  };
}

export function googleLoginSuccess() {
  return {
    type: "GOOGLE_LOGIN_SUCCESS"
  };
}

export function googleLoginFailure(err) {
  return {
    type: "GOOGLE_LOGIN_FAILURE",
    err
  };
}

//FACEBOOK
export function facebookLoginRequest() {
  return {
    type: "FACEBOOK_LOGIN_REQUEST"
  };
}

export function facebookLoginSuccess() {
  return {
    type: "FACEBOOK_LOGIN_SUCCESS"
  };
}

export function facebookLoginFailure(err) {
  return {
    type: "FACEBOOK_LOGIN_FAILURE",
    err
  };
}

//LOGOUT
export function logout() {
  return {
    type: "LOGOUT"
  };
}
