export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const loginRequest = (email:any,password:any) => ({

  type: LOGIN_REQUEST,

 payload: { email, password},

});

export const signupRequest = (email:any,password:any) => ({

  type: SIGNUP_REQUEST,
  payload: { email, password},


});
export const loginSuccess = () => ({

  type:LOGIN_SUCCESS,

});

 

export const loginFailure = (error:any) => ({

  type: LOGIN_FAILURE,

  payload: error,

});

export const signupSuccess = () => ({

  type:SIGNUP_SUCCESS,

});

 

export const signupFailure = (error:any) => ({

  type: SIGNUP_FAILURE,

  payload: error,

});


