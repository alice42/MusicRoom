import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import { unlinkAccountMethod, linkAccountMethod, signinMethod, loginClassic, loginFacebook, loginGoogle, recoverPassword, updateMethod, logoutMethod, updatePrivacyMethod } from '../services/apiService'
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
      // console.log('RESPONSE LOG IN ', response)
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
    // console.log('RESPONSE', facebookInformation)
    if (response.error) {
      yield put({ type: 'LOGIN_FAILURE', error: response.error })
    } else {
      yield put({
        type: 'LOGIN_SUCCESS_FACEBOOK',
        response: {
          user: facebookInformation,
          sessionId: response.sessionId
        }
      })
    }
  } catch (err) {
    yield put({ type: 'LOGIN_FAILURE', error: err.message })
  }
}

function* loginGoogleSaga(action) {
  try {
    const googleInformation = yield call(getTokenGoogle)
    // console.log('INFO', googleInformation)
    if (googleInformation === 'cancelled') {
      yield put({ type: 'LOGIN_FAILURE', error: null })
    } else {
      const response = yield call(loginGoogle, googleInformation)
      if (response.error) {
        yield put({ type: 'LOGIN_FAILURE', error: response.error })
      } else {
        yield put({
          type: 'LOGIN_SUCCESS_GOOGLE',
          response: {
            user: googleInformation.user,
            sessionId: response.sessionId
          }
        })
      }
    }
  } catch (err) {
    yield put({ type: 'LOGIN_FAILURE', error: err.message })
  }
}

function* linkFacebookSaga(action) {
  try {
    const facebookInformation = yield call(getTokenFacebook)
    console.log('fB INFO', facebookInformation)
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
      // console.log('RESPONSE SAGA', response)
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
    console.log('RESPONSE  UNLINK SAGA', response)
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
    console.log('fB INFO', googleInformation)
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
      // console.log('RESPONSE SAGA', response)
      yield put({
        type: 'LINK_GOOGLE_SUCCESS',
        response
      })
    }
  } catch (err) {
    yield put({ type: 'LINK_FACEBOOK_FAILURE', error: err.message })
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
    console.log('RESPONSE  UNLINK SAGA', response)
    yield put({
      type: 'UNLINK_GOOGLE_SUCCESS',
      response
    })
  } catch (err) {
    yield put({ type: 'UNLINK_GOOGLE_FAILURE', error: err.message })
  }
}

function* recoverPasswordSaga(action) {
  const { email } = action
  try {
    const response = yield call(recoverPassword, email)
    yield put({
      type: 'RECOVER_PASSWORD_EMAIL_SEND',
      emailSendMessage: response.message
    })
  } catch (err) {
    yield put({
      type: 'RECOVER_PASSWORD_EMAIL_SEND',
      emailSendMessage: err.message
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
    if (response.error) {
      yield put({ type: 'UPDATE_FAILURE', error: response.error })
    } else {
      // console.log('RESPONSE SAGA', response)
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
    // console.log('TEST SAGA')
    const response = yield call(updatePrivacyMethod, payload)
    // console.log('RESPONSE PRIV SAGA', response)
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
    console.log(err.message)
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery('UNLINK_GOOGLE_REQUEST', unlinkGoogleSaga)], [yield takeEvery('UNLINK_FACEBOOK_REQUEST', unlinkFacebookSaga)], [yield takeEvery('LINK_FACEBOOK_REQUEST', linkFacebookSaga)], [yield takeEvery('LINK_GOOGLE_REQUEST', linkGoogleSaga)], [yield takeEvery('UPDATE_PRIVACY_REQUEST', updatePrivacySaga)], [yield takeEvery('SIGNIN_REQUEST', signinAppSaga)], [yield takeEvery('LOGIN_REQUEST', loginAppSaga)], [yield takeEvery('LOGIN_FACEBOOK_REQUEST', loginFacebookSaga)], [yield takeEvery('LOGIN_GOOGLE_REQUEST', loginGoogleSaga)], [yield takeEvery('RECOVER_PASSWORD_REQUEST', recoverPasswordSaga)], [yield takeEvery('UPDATE_USER_DATA_REQUEST', updateUserSaga)], [yield takeEvery('LOGOUT', logoutSaga)])
}
