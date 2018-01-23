import { combineReducers } from 'redux'

//import answersReducer from '../utils/redux/answers/reducer'
import requestsReducer from '../utils/redux/requests/reducer'
import authReducer from '../auth/reducer'
import clientsModule from "../clients/reducer";

/**
 * Combine all entity reducers from all modules
 */
const entitiesReducer = combineReducers({
    clients: clientsModule.entityReducer
})

/**
 * Combine all UI reducers from all modules
 */
const uiReducer = combineReducers({
    clients: clientsModule.uiReducer
})

/**
 * Complete app reducer
 */
export default combineReducers({
    requests: requestsReducer,
    auth: authReducer,
    entities: entitiesReducer,
    ui: uiReducer
})