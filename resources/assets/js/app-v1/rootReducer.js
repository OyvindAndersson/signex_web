import { combineReducers } from 'redux'
import {reducer as authReducer} from './auth';


/**
 * Combine all reducers into the single app-state object
 */
const rootReducer = combineReducers({
    auth:authReducer
});

export default rootReducer;

/*
    auth: {}
    api: {
        clients: {}
        projects: {}
        products: {}
    }
*/