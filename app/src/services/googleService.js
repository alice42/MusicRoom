import { statusCodes, GoogleSignin } from 'react-native-google-signin'

export const getTokenGoogle = async () => {
  try {
    const tokenGoogle = fetchGoogle()
    return tokenGoogle
  } catch (error) {
    throw error
  }
}

export const unsignGoogle = async () => {
  try {
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
  } catch (error) {
    console.log(error)
    throw error
  }
}

const fetchGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices()
    const userInfo = await GoogleSignin.signIn({
      scope: 'profile email'
    })
    return userInfo
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return 'cancelled'
    } else {
      throw error
    }
  }
}
