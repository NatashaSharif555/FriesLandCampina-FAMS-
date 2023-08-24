import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  loginSuccess,
  loginFailure,
} from "./actions";
import { api } from "../../api/service";

function* login(action: any): Generator<any, any, any> {
  try {
    const { email, password } = action.payload;
    const requestParams = {
      path: `${process.env.REACT_APP_LOGIN_URL}`,
      method: "POST",
      payload: {
        email,
        password,
        returnSecureToken: true,
      },
    };
    const response = yield call(api, requestParams);
    console.log(response);
    if (response.status === 200) {
      window.alert("Log In successful!");
      yield put(loginSuccess());
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* signup(action: any): Generator<any, any, any> {
  try {
    const { email, password } = action.payload;
    const requestParams = {
      path: `${process.env.REACT_APP_SIGNUP_URL}`,
      method: "POST",
      payload: {
        email,
        password,
        returnSecureToken: true,
      },
    };
    const response = yield call(api, requestParams);
    console.log(response);
    if (response.status === 200) {
      window.alert(" SIGNUP successful!");
      yield put(loginSuccess());
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(SIGNUP_REQUEST, signup);
}
