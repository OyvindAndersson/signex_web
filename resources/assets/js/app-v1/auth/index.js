import { verifyTokenAction } from './actions'

/**
 * Expose module ID
 */
export { MODULE_ID } from './constants'

/**
 * Expose reducers
 */
export {default as reducer} from './reducer'

/**
 * Preloads for this module
 * @param {function} dispatch Redux store dispatch
 */
export const preload = dispatch => {
    dispatch(verifyTokenAction())
}

/**
 * Expose components
 */
export {default as LoginPage} from './components/LoginPage'
export {default as LogoutPage} from './components/LogoutPage'
export { onlyAuth, exceptAuth } from './components/authHocs'
export {default as AuthRoute} from './components/AuthRoute'

/**
 * Expose selectors
 */
export { 
    isClientAuthenticated, 
    isVerifyLoginActive,
    isVerifyTokenActive
} from './selectors'