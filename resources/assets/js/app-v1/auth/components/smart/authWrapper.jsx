import React from 'react'

const defaults = {
    AuthenticatingComponent: () => null, // dont render anything while authenticating
    FailureComponent: () => null, // dont render anything on failure of the predicate
    wrapperDisplayName: 'AuthWrapper'
  }

export default (args) => {
    const { AuthenticatingComponent, FailureComponent, wrapperDisplayName } = {
        ...defaults,
        ...args
      }

    function wrapComponent(WrappedComponent){
        const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

        class AuthWrapper extends React.Component {
            render(){
                const {isAuthenticated, isAuthenticating} = this.props

                if(isAuthenticated){
                    return <WrappedComponent {...this.props} />
                } else if(isAuthenticating){
                    return <AuthenticatingComponent {...this.props} />
                } else {
                    return <FailureComponent {...this.props} />
                }
            }
        }

        return AuthWrapper
    }

    return wrapComponent
}



