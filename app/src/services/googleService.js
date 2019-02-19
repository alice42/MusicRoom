import { statusCodes, GoogleSignin } from "react-native-google-signin";

export const getTokenGoogle = async () => {
  try {
    const tokenGoogle = fetchGoogle();
    return tokenGoogle;
  } catch (error) {
    throw error;
  }
};

const fetchGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    throw error;
  }
};
