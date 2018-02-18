
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

/**
 * We'll import every section of the modules we're integrating to the system.
 * Reducers, sagas, actions and any other types needed for system init.
 * 
 */
import { preload as authPreload, reducer as authReducer } from 'Auth'
import { watchClientsLoad, watchClientsCreated, reducer as clientsReducers, preload as clientsPreload } from 'Clients'
import { watchOrdersLoad, watchOrdersCreated, reducer as ordersReducers } from 'Orders'
import { watchUsersLoad, preload as usersPreload, reducer as usersReducers } from 'Users'

/**-------------------------------------------------------------------------
 * Module reducers - entities and ui are system specific.
 *--------------------------------------------------------------------------*/

/**
 * Add all module entity reducers here
 */
const entitiesReducer = combineReducers({
    clients: clientsReducers.entityReducer,
    orders: ordersReducers.entityReducer,
    users: usersReducers.entityReducer
})

/**
 * Add all module UI reducers here.
 */
const uiReducer = combineReducers({
    clients: clientsReducers.uiReducer,
    orders: ordersReducers.uiReducer,
    users: usersReducers.uiReducer
})

/** Special redux-persist config for auth module */
const authPersistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['isAuthenticated']
}

export const moduleReducers = { 
    entitiesReducer, 
    uiReducer, 
    auth: persistReducer(authPersistConfig, authReducer) 
}

/**-------------------------------------------------------------------------
 * Module Preloads / actions
 *--------------------------------------------------------------------------*/

/**
 * Add module preloads here
 */
const preloads = [
    authPreload,
    usersPreload,
    clientsPreload,
]
export function runPreDispatch(store) {
    const { dispatch } = store

    preloads.map( function(action) {
        action(dispatch)
    })
}

/**-------------------------------------------------------------------------
 * Module Sagas
 *--------------------------------------------------------------------------*/

/**
 * Add module sagas to run, here
 */
const sagas = [
    watchClientsLoad,
    watchClientsCreated,

    watchOrdersLoad,
    watchOrdersCreated,

    watchUsersLoad
]
export function runSagas(sagaMiddleware) {
    sagas.map( function(moduleSaga){
        sagaMiddleware.run(moduleSaga)
    })
}