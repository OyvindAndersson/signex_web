import { compose, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducer'
import setupSubscriptions from './subscribers'

// Import sagas from active modules
import clientsSaga from '../clients/sagas'

/**
 * Update Authentication middleware
 * Updates localStorage at every action response so that we can
 * hydrate the store with a isAuthenticated value at init.
 * This improves the responsivenes of the UI (not load/waiting)
 * @param {*} store 
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
        isAuthenticated: localStorage ? localStorage.getItem('isAuthenticated') === true : false
    }
}

/**
 * Config for 1st level reducer. Only persist entities
 */
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['entities']
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

    const persistedReducer = persistReducer(persistConfig, rootReducer)

    let store = createStore(
        persistedReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(sagaMiddleware),
            applyMiddleware(updateAuthentication)
        )
    )

    let persistor = persistStore(store)

    setupSubscriptions(store)
    sagaMiddleware.run(clientsSaga)

    return { store, persistor }
}