import { statusCodes, GoogleSignin } from "react-native-google-signin";

const apiUrl = "http://192.168.0.14:3001/api";
const user = "/user";
const login = "/log-in";
const signin = "/sign-in";
const fbLogin = "/facebook-log-in";
const ggLogin = "/google-log-in";

const basicFetch = async (method, url, config, data) => {
  if (method === "GET") {
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (err) {
      throw err;
    }
  } else if (method === "POST") {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      return result;
    } catch (err) {
      throw err;
    }
  }
};

export const loginClassic = async ({ email, password }) => {
  const url = `${apiUrl}${user}${login}`;
  try {
    const response = await basicFetch("POST", url, {}, { email, password });
    return response;
  } catch (err) {
    throw err;
  }
};

export const signinMethod = async ({ email, password }) => {
  const url = `${apiUrl}${user}${signin}`;
  try {
    const response = await basicFetch("POST", url, {}, { email, password });
    return response;
  } catch (err) {
    throw err;
  }
};

export const loginFacebook = async ({ email, userToken }) => {
  const url = `${apiUrl}${user}${fbLogin}`;
  try {
    const log = await basicFetch("POST", url, {}, { email, userToken });
    return log;
  } catch (error) {
    throw error;
  }
};

export const loginGoogle = async response => {
  const { email } = response.user;
  const userToken = response.idToken;
  const url = `${apiUrl}${user}${ggLogin}`;
  try {
    const log = await basicFetch("POST", url, {}, { email, userToken });
    return log;
  } catch (error) {
    throw error;
  }
};
