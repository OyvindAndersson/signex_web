import { compose, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createPersistExTransform from 'AppUtils/persistex'

import rootPersistReducer from './reducer'
import setupSubscriptions from './subscribers'

// Intialize all active modules
import { runPreDispatch, runSagas } from './modulesInit'

/**
 * Configure and create the store
 * @param {*} initialState 
 * @param {*} history 
 */
export default function configureStore(initialState = {}, history) {
    // If Redux DevTools Ext is installed use it, otherwise use redux compose
    const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose

    // create the saga middleware
    const sagaMiddleware = createSagaMiddleware()

    // Create the actual store
    let store = createStore(
        rootPersistReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(sagaMiddleware)
        )
    )

    let persistor = persistStore(store, null, () => {
        runPreDispatch(store)
    })

    // Setup subs
    setupSubscriptions(store)

    // Run all module sagas
    runSagas(sagaMiddleware)

    console.debug('%c 2/3 [Store configured]', 'color: #DD3388')
    return { store, persistor }
}