import { compose, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createPersistExTransform from 'AppUtils/persistex'

import rootReducer from './reducer'
import setupSubscriptions from './subscribers'

// Import sagas and init-actions from active modules
import { verifyTokenAction } from 'Auth'
import { watchClientsLoad, watchClientsCreated } from 'Clients/sagas'

/**
 * Update Authentication middleware
 * Updates localStorage at every action response so that we can
 * hydrate the store with a isAuthenticated value at init.
 * This improves the responsivenes of the UI (not load/waiting)
 * @param {*} store 
 * @todo remove this shit and use redux-persist
 */
const updateAuthentication = store => next => action => {
    if(action.type == 'AUTH_VERIFY_LOGIN'){
        console.debug('%c Update auth middleware: Setting auth to [true]', 'color: magenta')
        localStorage.setItem('isAuthenticated', true)
    }
    if( action.type == 'ADD_FAILED_REQUEST' && (action.meta.requestType == 'AUTH_VERIFY_TOKEN' || action.meta.requestType == 'AUTH_VERIFY_LOGIN') ) {
        console.debug('%c Update auth middleware: Setting auth to [false]', 'color: magenta')
        localStorage.setItem('isAuthenticated', false)
    }
    let r = next(action)
    return r
}

/**
 * Initial hydration of the app state
 * @todo Fetch proper serialized state from localstorage
 */
const initialStateHydration = {
    auth: {
        isAuthenticated: localStorage ? localStorage.getItem('isAuthenticated') === 'true' : false
    }
}

/**
 * Controls the expiration-check of cached items
 */
const persistExpire = createPersistExTransform()
/**
 * Config for 1st level reducer. Only persist entities
 */
const persistConfig = {
    key: 'entities',
    storage: storage,
    whitelist: ['entities'],
    transforms: [persistExpire]
}

/**
 * Configure and create the store
 * @param {*} initialState 
 * @param {*} history 
 */
export default function configureStore(initialState = initialStateHydration, history) {
    // If Redux DevTools Ext is installed use it, otherwise use redux compose
    const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose

    // create the saga middleware
    const sagaMiddleware = createSagaMiddleware()
    // Configure all reducers, some are persisted (see whitelister reducers in persistConfig)
    const persistedReducer = persistReducer(persistConfig, rootReducer)

    // Create the actual store
    let store = createStore(
        persistedReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(sagaMiddleware),
            applyMiddleware(updateAuthentication)
        )
    )
    // Verify token at every request (refreshes) aside from API requests.
    store.dispatch(verifyTokenAction())
    let persistor = persistStore(store)

    // Setup subs
    setupSubscriptions(store)

    // Run sagas
    sagaMiddleware.run(watchClientsLoad)
    sagaMiddleware.run(watchClientsCreated)

    console.debug('%c 2/3 [Store configured]', 'color: #DD3388')

    return { store, persistor }
}