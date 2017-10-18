import {connect} from 'react-redux'

import authWrapper from './authWrapper'

// Default selector for authenticating state (falsy)
const connectedDefaults = {
    authenticatingSelector: () => false
}

/**
 * Create a connected component, enhanced with authWrapper.
 * The passed selectors are used to configure the underlying
 * component so that authWrapper may be used both for
 * protected routes, and open routes awaiting authentication
 * 
 * Examine the tests to get a better understanding.
 */
export default (args) => {
    const { authenticatedSelector, authenticatingSelector} = {
        ...connectedDefaults,
        ...args
    }

    return (WrappedComponent) => connect((state, ownProps) => ({
        isAuthenticated: authenticatedSelector(state, ownProps),
        isAuthenticating: authenticatingSelector(state, ownProps),
    }))(authWrapper(args)(WrappedComponent))
}