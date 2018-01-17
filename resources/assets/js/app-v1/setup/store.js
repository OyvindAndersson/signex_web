import { compose, createStore, applyMiddleware } from "redux"

import reducer from './reducer'
import setupSubscriptions from "./subscribers"

export default function configureStore(initialState = {}, history) {
    // If Redux DevTools Ext is installed use it, otherwise use redux compose
    const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose

    const store = createStore(
        reducer,
        initialState,
        composeEnhancers()
    )

    setupSubscriptions(store)

    return store
}