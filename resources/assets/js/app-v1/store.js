import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './rootReducer'

/**
 * Apply all middlewares, conditionally
 * @returns - middlewares to apply
 */
function middlewares(){
  if(SIGNEX.dev.logDispatch){
    const loggerMiddleware = createLogger()
    
    return applyMiddleware(thunkMiddleware, loggerMiddleware)

  } else {

    return applyMiddleware(thunkMiddleware)

  }
}

/**
 * Init redux store
 * @param {object} preloadedState 
 */
function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    middlewares()
  )
}

const appStore = configureStore()
export default appStore