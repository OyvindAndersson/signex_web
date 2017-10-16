/**
 * Use the index file to expose parts of the module
 * to external modules
 */

 import {authUserToken} from './actions'

 /**
  * Initialize auth
  * @param {redux} store 
  */
 export function initAuth(store){
     // Get user info
    store.dispatch(authUserToken())
 }

 /**  */
 export {AuthRoute, IsAuthRoute} from './components/authRoute'


 /** */
 import connectedAuthWrapper from './components/smart/connectedAuthWrapper'

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