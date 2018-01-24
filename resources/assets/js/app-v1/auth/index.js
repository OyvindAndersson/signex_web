/**
 * Expose the modules' API
 */

/** Auth module reducer */
export {default as reducer} from './reducer'

/** Auth module actions other may depend upon */
export { verifyTokenAction } from './actions'

/** Components */
export {default as LoginPage} from './components/LoginPage'
export {default as LogoutPage} from './components/LogoutPage'
export { onlyAuth, exceptAuth } from './components/authHocs'
export {default as AuthRoute} from './components/AuthRoute'

/** Useful selectors for other modules */
export { 
    isClientAuthenticated, 
    isVerifyLoginActive,
    isVerifyTokenActive
} from './selectors'