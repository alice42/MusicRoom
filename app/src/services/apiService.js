import { statusCodes, GoogleSignin } from "react-native-google-signin";
import Config from "react-native-config";

const apiUrl = Config.API_URL;
const api = "/api";
const user = "/user";
const signin = "/sign-in";
const login = "/log-in";
const fbLogin = "/facebook-log-in";
const ggLogin = "/google-log-in";
const recover = "/recover";
const update = "/update-data";
const updatePrivacy = "/update-privacy";
const linkAccount = "/link-account";
const unlinkAccount = "/unlink-account";

const omit = (obj, keys) => {
  const copy = { ...obj };
  keys.forEach(key => {
    delete copy[key];
  });
  return copy;
};

export const basicFetch = async (method, url, config, data) => {
  try {
    const fetchConfig = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(config.headers ? config.headers : {})
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
      ...(config ? omit(config, ["headers", "body", "method"]) : {})
    };
    console.log(fetchConfig);
    const response = await fetch(url, fetchConfig);
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
};

export const signinMethod = async ({ email, password }) => {
  const url = `${apiUrl}${api}${user}${signin}`;
  try {
    const response = await basicFetch("POST", url, {}, { email, password });
    return response;
  } catch (err) {
    throw err;
  }
};

export const loginClassic = async ({ email, password }) => {
  const url = `${apiUrl}${api}${user}${login}`;
  try {
    const response = await basicFetch("POST", url, {}, { email, password });
    return response;
  } catch (err) {
    throw err;
  }
};

export const loginFacebook = async ({ email, userToken }) => {
  const url = `${apiUrl}${api}${user}${fbLogin}`;
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
  const url = `${apiUrl}${api}${user}${ggLogin}`;
  try {
    const log = await basicFetch("POST", url, {}, { email, userToken });
    return log;
  } catch (error) {
    throw error;
  }
};

export const recoverPassword = async email => {
  const url = `${apiUrl}${api}${user}${recover}`;
  try {
    const response = await basicFetch("POST", url, {}, { email });
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateMethod = async ({ token, toChange, newValue }) => {
  const url = `${apiUrl}${api}${user}${update}`;
  try {
    const response = await basicFetch(
      "POST",
      url,
      {},
      { token, toChange, newValue }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const updatePrivacyMethod = async ({
  token,
  privacyValue,
  dataType
}) => {
  const url = `${apiUrl}${api}${user}${updatePrivacy}`;
  try {
    const response = await basicFetch(
      "POST",
      url,
      {},
      { token, privacyValue, dataType }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const logoutMethod = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (err) {
    throw err;
  }
};

export const searchTracksMethod = async query => {
  const url = `${apiUrl}${api}/alice/search`;
  try {
    const response = await basicFetch("POST", url, {}, { query });
    return response.results.data;
  } catch (err) {
    throw err;
  }
};

export const linkAccountMethod = async query => {
  const url = `${apiUrl}${api}${user}${linkAccount}`;
  try {
    const response = await basicFetch("POST", url, {}, query);
    return response;
  } catch (err) {
    throw err;
  }
};

export const unlinkAccountMethod = async query => {
  const url = `${apiUrl}${api}${user}${unlinkAccount}`;
  try {
    const response = await basicFetch("POST", url, {}, query);
    return response;
  } catch (err) {
    throw err;
  }
};
