import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import { signinMethod, loginClassic, loginFacebook, loginGoogle, recoverPassword, updateMethod, logoutMethod } from '../services/apiService'
import { getTokenFacebook } from '../services/facebookService'
import { getTokenGoogle } from '../services/googleService'

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
        response: { sessionId: response.sessionId, email }
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
      yield put({ type: 'LOGIN_FAILURE', error: response.error })
    } else {
      yield put({
        type: 'LOGIN_SUCCESS_FACEBOOK',
        response: {
          email: facebookInformation.email,
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
      yield put({
        type: 'UPDATE_SUCCESS'
      })
    }
  } catch (err) {
    yield put({ type: 'UPDATE_FAILURE', error: err.message })
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
  yield all([yield takeEvery('SIGNIN_REQUEST', signinAppSaga)], [yield takeEvery('LOGIN_REQUEST', loginAppSaga)], [yield takeEvery('LOGIN_FACEBOOK_REQUEST', loginFacebookSaga)], [yield takeEvery('LOGIN_GOOGLE_REQUEST', loginGoogleSaga)], [yield takeEvery('RECOVER_PASSWORD_REQUEST', recoverPasswordSaga)], [yield takeEvery('UPDATE_USER_DATA_REQUEST', updateUserSaga)], [yield takeEvery('LOGOUT', logoutSaga)])
}
