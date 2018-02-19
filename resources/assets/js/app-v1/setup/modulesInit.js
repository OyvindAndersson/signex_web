
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

/**
 * We'll import every section of the modules we're integrating to the system.
 * Reducers, sagas, actions and any other types needed for system init.
 * 
 */
import { preload as authPreload, reducer as authReducer } from 'Auth'
import { watchUsersLoad, preload as usersPreload, reducer as usersReducers } from 'Users'
import { watchClientsLoad, watchClientsCreated, reducer as clientsReducers, preload as clientsPreload } from 'Clients'
import { watchOrdersLoad, watchOrdersCreated, reducer as ordersReducers } from 'Orders'
import { watchOrdertypesLoad, reducer as ordertypeReducers, preload as ordertypesPreload } from '../ordertypes'
/**-------------------------------------------------------------------------
 * Module reducers - entities and ui are system specific.
 *--------------------------------------------------------------------------*/

/**
 * Add all module entity reducers here
 */
const entitiesReducer = combineReducers({
	users: usersReducers.entityReducer,
    clients: clientsReducers.entityReducer,
    orders: ordersReducers.entityReducer,
	ordertypes: ordertypeReducers.entityReducer,
})

/**
 * Add all module UI reducers here.
 */
const uiReducer = combineReducers({
    clients: clientsReducers.uiReducer,
    orders: ordersReducers.uiReducer,
    users: usersReducers.uiReducer,
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
	ordertypesPreload
]
export function runPreDispatch(store) {
    const { dispatch } = store

	preloads.forEach( (action) => { action(dispatch) })
}

/**-------------------------------------------------------------------------
 * Module Sagas
 *--------------------------------------------------------------------------*/

/**
 * Add module sagas to run, here
 */
const sagas = [
	watchUsersLoad,

    watchClientsLoad,
    watchClientsCreated,

    watchOrdersLoad,
    watchOrdersCreated,
	watchOrdertypesLoad,
	
]
export function runSagas(sagaMiddleware) {
    sagas.map( function(moduleSaga){
        sagaMiddleware.run(moduleSaga)
    })
}