import { AccessToken, LoginManager } from 'react-native-fbsdk'

export const getTokenFacebook = async () => {
  try {
    const tokenFacebook = fetchFacebook()
    return tokenFacebook
  } catch (error) {
    throw err
  }
}

const fetchFacebook = () => {
  return new Promise((resolve, reject) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      result => {
        if (result.isCancelled) {
          reject(result.isCancelled)
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data
            fetch(
              'https://graph.facebook.com/v2.5/me?fields=email,last_name,first_name,picture&access_token=' +
                accessToken
            )
              .then(response => response.json())
              .then(json => {
                const facebookInformation = {
                  email: json.email,
                  avatarUri: json.picture.data.url,
                  lastname: json.last_name,
                  firstname: json.first_name,
                  userToken: accessToken
                }

                resolve(facebookInformation)
              })
              .catch(() => {
                console.error('ERROR GETTING DATA FROM FACEBOOK')
              })
          })
        }
      },
      error => {
        reject(error)
      }
    )
  })
}
