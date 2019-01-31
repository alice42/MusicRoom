import { AccessToken, LoginManager } from "react-native-fbsdk";

export const getTokenFacebook = async () => {
  try {
    const tokenFacebook = fetchFacebook();
    return tokenFacebook;
  } catch (error) {
    throw err;
  }
};

const fetchFacebook = () => {
  return new Promise((resolve, reject) => {
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          reject(result.isCancelled);
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data;
            fetch(
              "https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=" +
                accessToken
            )
              .then(response => response.json())
              .then(json => {
                const facebookInformation = {
                  email: json.email,
                  userToken: accessToken
                };

                resolve(facebookInformation);
              })
              .catch(() => {
                console.error("ERROR GETTING DATA FROM FACEBOOK");
              });
          });
        }
      },
      function(error) {
        reject(error);
      }
    );
  });
};
