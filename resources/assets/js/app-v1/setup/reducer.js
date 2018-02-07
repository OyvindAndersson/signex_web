import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createPersistExTransform from 'AppUtils/persistex'

//import answersReducer from '../utils/redux/answers/reducer'
import requestsReducer from '../utils/redux/requests/reducer'
import authReducer from '../auth/reducer'
import usersModule from '../users/reducer'
import clientsModule from "../clients/reducer"
import ordersModule from "../orders/reducer"

/**
 * Combine all entity reducers from all modules
 */
const entitiesReducer = combineReducers({
    clients: clientsModule.entityReducer,
    orders: ordersModule.entityReducer,
    users: usersModule.entityReducer
})

/**
 * Combine all UI reducers from all modules
 */
const uiReducer = combineReducers({
    clients: clientsModule.uiReducer,
    orders: ordersModule.uiReducer,
    users: usersModule.uiReducer
})


/**
 * Controls the expiration-check of cached items
 */
const persistExpire = createPersistExTransform()


/**
 * Config for 1st level reducer. Only persist entities
 */
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['entities'],
    transforms: [persistExpire]
}

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['isAuthenticated']
  }

/**
 * Complete app reducer
 */
export default persistReducer(
    persistConfig,
    combineReducers({
        requests: requestsReducer,
        auth: persistReducer(authPersistConfig, authReducer),
        entities: entitiesReducer,
        ui: uiReducer
    })
)