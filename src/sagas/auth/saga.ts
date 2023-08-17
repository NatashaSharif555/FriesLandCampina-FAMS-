import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
} from './actions';

function* login(action: any): Generator<any, any, any> {
  try {
    const { email, password } = action.payload;
    const response = yield call(axios.post, `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvvb6wHN-OJBEZysH3bYz9oIbJcDmMMT0`, {
      email,
      password,
      returnSecureToken: true,
    });
    if (response.status === 200) {
      window.alert('Log In successful!'); 

      yield put(loginSuccess());
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* signup(action: any): Generator<any, any, any> {
  try {
    const { email, password } = action.payload;
    const response = yield call(axios.post, `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvvb6wHN-OJBEZysH3bYz9oIbJcDmMMT0`, {
      email,
      password,
      returnSecureToken: true,
    });
    if (response.status === 200) {
      window.alert('Sign Up successful!'); 

      yield put(signupSuccess());
    }
  } catch (error:any) {
    yield put(signupFailure(error.message));
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(SIGNUP_REQUEST, signup);
}
