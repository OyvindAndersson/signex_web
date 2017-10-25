import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import clientsReducer from './clients/reducer'

/**
 * Combine all entity reducers, specific to models/api state-keeping
 * i.e: Users, Projects, Orders etc
 */
const entities = combineReducers({
    clients:clientsReducer
})

/**
 * Combine all UI reducers, specific to UI state-keeping.
 * ie: ClientsPage, ProjectDetailPage etc.
 */
const ui = combineReducers({
    //
})

/**
 * Combine all reducers into the single app-state object
 */
const rootReducer = combineReducers({
    auth:authReducer,
    entities:entities,
    // ui:ui
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