import { combineReducers } from 'redux';

import authReducer from './auth/reducers';
 

const rootReducer = combineReducers({

    users: authReducer,

 

});

 

export default rootReducer;