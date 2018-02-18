import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createPersistExTransform from 'AppUtils/persistex'
import requestsReducer from 'AppUtils/redux/requests/reducer'

/* Import all active module reducers */
import { moduleReducers } from './modulesInit'


/**
 * Controls the expiration-check of cached items
 */
const persistExpire = createPersistExTransform()

/**
 * Config for 1st level reducer. Only persists entities
 */
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['entities'],
    transforms: [persistExpire]
}

/**
 * Complete app reducer
 */
const { entitiesReducer, uiReducer, ...rest } = moduleReducers

export default persistReducer(
    persistConfig,
    combineReducers({
        requests: requestsReducer,
        entities: entitiesReducer,
        ui: uiReducer,
        ...rest
    })
)