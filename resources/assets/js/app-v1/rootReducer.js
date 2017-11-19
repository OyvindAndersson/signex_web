import { combineReducers } from 'redux'
import authReducers from './auth/reducer'
import clientsReducers from './clients/reducer'
import ordersReducers from './orders/reducer'

/**
 * Combine all entity reducers, specific to models/api state-keeping
 * i.e: Users, Projects, Orders etc
 */
const entities = combineReducers({
    users:authReducers.usersReducer,
    clients:clientsReducers.clientsReducer,
    orders:ordersReducers.ordersReducer
})

/**
 * Combine all UI reducers, specific to UI state-keeping.
 * ie: ClientsPage, ProjectDetailPage etc.
 */
const ui = combineReducers({
    clientPage:clientsReducers.clientsUiReducer,
    orderPage: ordersReducers.ordersUiReducer
})

/**
 * Combine all reducers into the single app-state object
 */
const rootReducer = combineReducers({
    auth:authReducers.authReducer,
    entities:entities,
    ui:ui
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