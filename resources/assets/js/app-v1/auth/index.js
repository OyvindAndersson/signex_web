/**
 * Expose the modules' API
 */
import {authUserToken, usersFetchAll} from './actions'
import jwt_decode from 'jwt-decode'

/**---------------------------------------------
 * Initialize auth module 
 * ---------------------------------------------
 * 
 * Optional: Called at the beginning of every new request.
 * All resource request will/should still be validated.
*/
export function initAuth(store) { 
    // Always update user auth status at every new request
    store.dispatch(authUserToken())
}

/** Components */
export {default as LoginPage} from './components/container/loginPage'
export {default as LogoutPage} from './components/container/logoutPage'

/** Route helper components */
export {default as AuthRoute} from './components/authRoute'

export {default as reducer} from './reducer'
export {default as authWrapper} from './components/container/authWrapper'