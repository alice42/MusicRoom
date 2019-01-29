import { AccessToken, LoginManager } from "react-native-fbsdk";
import { statusCodes, GoogleSignin } from "react-native-google-signin";

const apiUrl = "http://192.168.0.14:3001/api";
const user = "/user";
const login = "/log-in";
const signin = "/sign-in";

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
  const url = `${apiUrl}${user}${login}?email=${email}&password=${password}`;
  try {
    const response = await basicFetch("GET", url);
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

export const loginFacebook = async () => {
  LoginManager.logInWithReadPermissions(["public_profile"]).then(
    function(result) {
      if (result.isCancelled) {
        console.log("Login was cancelled");
      } else {
        console.log(
          "Login was successful with permissions: " +
            result.grantedPermissions.toString()
        );
        AccessToken.getCurrentAccessToken().then(data => {
          dispatch(data.accessToken.toString());
        });
        //APPEL API??
      }
    },
    function(error) {
      console.log("Login failed with error: " + error);
    }
  );
};

export const loginGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      console.log("User Google", userInfo);
      // some other error happened
    }
  }
};
