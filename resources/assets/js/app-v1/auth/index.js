/**
 * Expose the modules' API
 */
import {authUserToken} from './actions'

/** Initialize auth module */
export function initAuth(store){ store.dispatch(authUserToken()) }

/** Components */
export {default as LoginPage} from './components/container/loginPage'
export {default as LogoutPage} from './components/container/logoutPage'
/** Route helper components */
export {AuthRoute} from './components/authRoute'

/** Expose module reducer */
export {default as reducer} from './reducer'



 /*

 import connectedAuthWrapper from './components/container/connectedAuthWrapper'

 const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.auth.isAuthenticated,
  wrapperDisplayName: 'UserIsAuthenticated'
}

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults)

const userIsNotAuthenticatedDefaults = {
  authenticatedSelector: state => !state.auth.isAuthenticated,
  authenticatingSelector: state => state.auth.isAuthenticating,
  wrapperDisplayName: 'UserIsNotAuthenticated'
}

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults)

*/