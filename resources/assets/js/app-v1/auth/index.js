/**
 * Expose the modules' API
 */
import { verifyTokenAction } from './actions'

/**---------------------------------------------
 * Initialize auth module 
 * ---------------------------------------------
 * 
 * Optional: Called at the beginning of every new request.
 * All resource request will/should still be validated.
*/
export function initAuth(store) { 
    // Always update user auth status at every new request
    store.dispatch(verifyTokenAction())
}

/** Components */
export {default as LoginPage} from './components/LoginPage'
export {default as LogoutPage} from './components/LogoutPage'
export { onlyAuth, exceptAuth } from './components/authHocs'

/** Route helper components */
export {default as AuthRoute} from './components/AuthRoute'

/** Auth module reducer */
export {default as reducer} from './reducer'

/** Useful selectors for other modules */
export { 
    isClientAuthenticated, 
    isVerifyLoginActive,
    isVerifyTokenActive
} from './selectors'