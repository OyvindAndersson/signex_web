import { combineReducers } from 'redux'
import authReducer from './auth-reducer';


/**
 * Combine all reducers into the single app-state object
 */
const rootReducer = combineReducers({
    auth:authReducer
});

export default rootReducer;