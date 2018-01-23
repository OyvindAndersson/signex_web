import React from 'react'

const defaults = {
    LoadingComponent: () => null, // dont render anything while working
    ElseComponent: () => null, // dont render anything on failure of the predicate
    wrapperDisplayName: 'AuthWrapper'
  }

  /**
   * Only render WrappedComponent when authenticated.
   * If not authed, FailureComponent will render.
   * If login is dispatched, or verify-token is
   * dispatched, LoadingComponent is rendered
   * 
   * @param {*} args 
   */
export const onlyAuth = (args) => {
    const { LoadingComponent, ElseComponent, wrapperDisplayName } = {
        ...defaults,
        ...args
      }

    function wrapComponent(WrappedComponent){
        const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

        class AuthWrapper extends React.Component {
            render(){
                const {isAuthenticated, isVerifyingLogin, isVerifyingToken} = this.props

                if(isAuthenticated && !isVerifyingLogin && !isVerifyingToken){
                    return <WrappedComponent {...this.props} />
                } else if(isVerifyingLogin || isVerifyingToken){
                    return <LoadingComponent {...this.props} />
                } else {
                    return <ElseComponent {...this.props} />
                }
            }
        }

        return AuthWrapper
    }

    return wrapComponent
}

/**
 * Only render Wrapped component when not authenticated.
 * If authenticated, the ElseComponent will render.
 * 
 * @param {*} args 
 */
export const exceptAuth = (args) => {
    const { LoadingComponent, ElseComponent, wrapperDisplayName } = {
        ...defaults,
        ...args
      }

    function wrapComponent(WrappedComponent){
        const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

        class AuthWrapper extends React.Component {
            render(){
                const {isAuthenticated, isVerifyingLogin, isVerifyingToken} = this.props

                if(!isAuthenticated && !isVerifyingLogin && !isVerifyingToken){
                    return <WrappedComponent {...this.props} />
                } else if(isVerifyingLogin || isVerifyingToken){
                    return <LoadingComponent {...this.props} />
                } else {
                    return <ElseComponent {...this.props} />
                }
            }
        }

        return AuthWrapper
    }

    return wrapComponent
}