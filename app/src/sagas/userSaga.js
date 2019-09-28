import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import {
  unlinkAccountMethod,
  linkAccountMethod,
  signinMethod,
  loginClassic,
  loginFacebook,
  loginGoogle,
  recoverPassword,
  updateMethod,
  logoutMethod,
  updatePrivacyMethod
} from '../services/apiService'
import { getTokenFacebook } from '../services/facebookService'
import { getTokenGoogle, unsignGoogle } from '../services/googleService'

function* signinAppSaga(action) {
  const { email, password } = action
  try {
    const payload = {
      email,
      password
    }
    const response = yield call(signinMethod, payload)
    if (response.error) {
      yield put({ type: 'SIGNIN_FAILURE', error: response.error })
    } else {
      yield put({ type: 'SIGNIN_SUCCESS', response: response.message })
    }
  } catch (err) {
    yield put({ type: 'SIGNIN_FAILURE', error: err.message })
  }
}

function* loginAppSaga(action) {
  const { email, password } = action
  try {
    const payload = {
      email,
      password
    }
    const response = yield call(loginClassic, payload)
    if (response.error) {
      yield put({ type: 'LOGIN_FAILURE', error: response.error })
    } else {
      yield put({
        type: 'LOGIN_SUCCESS',
        response
      })
    }
  } catch (err) {
    yield put({ type: 'LOGIN_FAILURE', error: err.message })
  }
}

function* loginFacebookSaga(action) {
  try {
    const facebookInformation = yield call(getTokenFacebook)
    const response = yield call(loginFacebook, facebookInformation)
    if (response.error) {
      yield put({ type: 'LOGIN_FACEBOOK_FAILURE', error: response.error })
    } else {
      yield put({
        type: 'LOGIN_SUCCESS_FACEBOOK',
        response: {
          user: response.user,
          sessionId: response.sessionId
        }
      })
    }
  } catch (err) {
    yield put({ type: 'LOGIN_FACEBOOK_FAILURE', error: err.message })
  }
}

function* loginGoogleSaga(action) {
  try {
    const googleInformation = yield call(getTokenGoogle)
    if (googleInformation === 'cancelled') {
      yield put({ type: 'LOGIN_GOOGLE_FAILURE', error: null })
    } else {
      const response = yield call(loginGoogle, googleInformation)
      if (response.error) {
        yield put({ type: 'LOGIN_GOOGLE_FAILURE', error: response.error })
      } else {
        yield put({
          type: 'LOGIN_SUCCESS_GOOGLE',
          response: {
            user: response.user,
            sessionId: response.sessionId
          }
        })
      }
    }
  } catch (err) {
    yield put({ type: 'LOGIN_GOOGLE_FAILURE', error: err.message })
  }
}

function* linkFacebookSaga(action) {
  try {
    const facebookInformation = yield call(getTokenFacebook)
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      type: 'facebook',
      key: facebookInformation.userToken
    }
    const response = yield call(linkAccountMethod, payload)
    if (response.error) {
      yield put({ type: 'LINK_FACEBOOK_FAILURE', error: response.error })
    } else {
      yield put({
        type: 'LINK_FACEBOOK_SUCCESS',
        response
      })
    }
  } catch (err) {
    yield put({ type: 'LINK_FACEBOOK_FAILURE', error: err.message })
  }
}

function* unlinkFacebookSaga(action) {
  try {
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      type: 'facebook'
    }
    const response = yield call(unlinkAccountMethod, payload)
    yield put({
      type: 'UNLINK_FACEBOOK_SUCCESS',
      response
    })
  } catch (err) {
    yield put({ type: 'UNLINK_FACEBOOK_FAILURE', error: err.message })
  }
}

function* linkGoogleSaga(action) {
  try {
    const googleInformation = yield call(getTokenGoogle)
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      type: 'google',
      key: googleInformation.idToken
    }
    const response = yield call(linkAccountMethod, payload)
    if (response.error) {
      yield put({ type: 'LINK_GOOGLE_FAILURE', error: response.error })
    } else {
      yield put({
        type: 'LINK_GOOGLE_SUCCESS',
        response
      })
    }
  } catch (err) {
    yield put({ type: 'LINK_GOOGLE_FAILURE', error: err.message })
  }
}

function* unlinkGoogleSaga(action) {
  try {
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      type: 'google'
    }
    yield call(unsignGoogle)
    const response = yield call(unlinkAccountMethod, payload)
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({
        type: 'UNLINK_GOOGLE_SUCCESS',
        response
      })
    }
  } catch (err) {
    yield put({ type: 'UNLINK_GOOGLE_FAILURE', error: err.message })
  }
}

function* linkDeezerSaga(action) {
  try {
    const token = yield select(state => state.user.token)
    const deezerToken = yield select(state => state.user.deezerToken)
    const payload = {
      token,
      type: 'deezer',
      key: deezerToken
    }
    const response = yield call(linkAccountMethod, payload)
    if (response.error) {
      yield put({ type: 'LINK_DEEZER_FAILURE', error: response.error })
    } else {
      yield put({
        type: 'LINK_DEEZER_SUCCESS',
        response
      })
    }
  } catch (err) {
    yield put({ type: 'LINK_DEEZER_FAILURE', error: err.message })
  }
}

function* unlinkDeezerSaga(action) {
  try {
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      type: 'deezer'
    }
    const response = yield call(unlinkAccountMethod, payload)
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({
        type: 'UNLINK_DEEZER_SUCCESS',
        response
      })
    }
  } catch (err) {
    yield put({ type: 'UNLINK_DEEZER_FAILURE', error: err.message })
  }
}

function* recoverPasswordSaga(action) {
  const { email } = action
  try {
    const response = yield call(recoverPassword, email)
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({
        type: 'RECOVER_PASSWORD_EMAIL_SEND',
        emailSendMessage: response.message
      })
    }
  } catch (err) {
    yield put({
      type: 'RECOVER_PASSWORD_EMAIL_SEND_FAILURE',
      error: err.message
    })
  }
}

function* updateUserSaga(action) {
  const { token, newValue, toChange } = action
  try {
    const payload = {
      token,
      toChange,
      newValue
    }
    const response = yield call(updateMethod, payload)
    console.log('SAGA', response)
    if (response.error) {
      yield put({ type: 'UPDATE_FAILURE', error: response.error })
    } else {
      yield put({
        type: 'UPDATE_SUCCESS',
        response
      })
    }
  } catch (err) {
    yield put({ type: 'UPDATE_FAILURE', error: err.message })
  }
}

function* updatePrivacySaga(action) {
  const { token, privacyValue, dataType } = action
  try {
    const payload = {
      token,
      privacyValue,
      dataType
    }
    const response = yield call(updatePrivacyMethod, payload)
    if (response.error) {
      yield put({ type: 'UPDATE_PRIVACY_FAILURE', error: response.error })
    } else {
      yield put({
        type: 'UPDATE_SUCCESS',
        response
      })
    }
  } catch (err) {
    yield put({ type: 'UPDATE_PRIVACY_FAILURE', error: err.message })
  }
}

function* logoutSaga(action) {
  try {
    yield call(logoutMethod)
  } catch (err) {
    yield put({ type: 'LOGOUT_FAILURE', error: err.message })
  }
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery('LINK_DEEZER_REQUEST', linkDeezerSaga)],
    [yield takeEvery('UNLINK_DEEZER_REQUEST', unlinkDeezerSaga)],
    [yield takeEvery('UNLINK_GOOGLE_REQUEST', unlinkGoogleSaga)],
    [yield takeEvery('UNLINK_FACEBOOK_REQUEST', unlinkFacebookSaga)],
    [yield takeEvery('LINK_FACEBOOK_REQUEST', linkFacebookSaga)],
    [yield takeEvery('LINK_GOOGLE_REQUEST', linkGoogleSaga)],
    [yield takeEvery('UPDATE_PRIVACY_REQUEST', updatePrivacySaga)],
    [yield takeEvery('SIGNIN_REQUEST', signinAppSaga)],
    [yield takeEvery('LOGIN_REQUEST', loginAppSaga)],
    [yield takeEvery('LOGIN_FACEBOOK_REQUEST', loginFacebookSaga)],
    [yield takeEvery('LOGIN_GOOGLE_REQUEST', loginGoogleSaga)],
    [yield takeEvery('RECOVER_PASSWORD_REQUEST', recoverPasswordSaga)],
    [yield takeEvery('UPDATE_USER_DATA_REQUEST', updateUserSaga)],
    [yield takeEvery('LOGOUT', logoutSaga)]
  )
}
