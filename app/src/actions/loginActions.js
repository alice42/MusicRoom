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

export function googleLoginRequest() {
  return {
    type: "GOOGLE_LOGIN_REQUEST"
  };
}

export function googleLoginSuccess({ token, user }) {
  return {
    type: "GOOGLE_LOGIN_SUCCESS",
    token,
    user
  };
}

export function googleLoginFailure(err) {
  return {
    type: "GOOGLE_LOGIN_FAILURE",
    err
  };
}

export function facebookLoginRequest() {
  console.log("2");
  return {
    type: "FACEBOOK_LOGIN_REQUEST"
  };
}

export function facebookLoginSuccess({ token, user }) {
  return {
    type: "FACEBOOK_LOGIN_SUCCESS",
    token,
    user
  };
}

export function facebookLoginFailure(err) {
  return {
    type: "FACEBOOK_LOGIN_FAILURE",
    err
  };
}

export function logout() {
  return {
    type: "LOGOUT"
  };
}
