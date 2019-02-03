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

//FACEBOOK
export function loginFacebookRequest() {
  return {
    type: "LOGIN_FACEBOOK_REQUEST"
  };
}

//GOOGLE
export function loginGoogleRequest() {
  return {
    type: "LOGIN_GOOGLE_REQUEST"
  };
}

//LOGOUT
export function logout() {
  return {
    type: "LOGOUT"
  };
}

//RESET
export function recoverPasswordRequest(email) {
  return {
    type: "RECOVER_PASSWORD_REQUEST",
    email
  };
}

export function resetPasswordRequest(token, password, passwordConfirm) {
  return {
    type: "RESET_PASSWORD_REQUEST",
    token,
    password,
    passwordConfirm
  };
}
