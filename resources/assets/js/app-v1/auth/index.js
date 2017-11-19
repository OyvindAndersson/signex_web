/**
 * Expose the modules' API
 */
import {authUserToken, usersFetchAll} from './actions'
import jwt_decode from 'jwt-decode'

/**---------------------------------------------
 * Initialize auth module 
 * ---------------------------------------------
 * 
 * Called at the beginning of every new request.
 * 
*/
export function initAuth(store) { 
    // Always update user auth status at every new request
    store.dispatch(authUserToken())
    store.dispatch(usersFetchAll())
}

/** Components */
export {default as LoginPage} from './components/container/loginPage'
export {default as LogoutPage} from './components/container/logoutPage'

/** Route helper components */
export {AuthRoute} from './components/authRoute'

export {default as reducer} from './reducer'
export {default as authWrapper} from './components/container/authWrapper'