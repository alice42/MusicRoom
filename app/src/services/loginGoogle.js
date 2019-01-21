import { Google } from "expo";

export const loginGoogleCall = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId:
        "392308976145-a2562q6bmmf7rgih5ut8qdaodcfc87se.apps.googleusercontent.com",
      iosClientId:
        "392308976145-3t8s38jocte99hlhm3kedjb9jt6p2mtb.apps.googleusercontent.com",
      scopes: ["profile", "email"],
      behavior: "web"
    });
    if (result.type === "success") {
      return result;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { cancelled: true };
  }
};