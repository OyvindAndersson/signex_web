import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { authLoginUser } from '../../actions'
import authWrapper from './authWrapper'
import constants from '../../constants'
import Login from '../presentation/login'
import Authenticating from '../presentation/authenticating'

/**
 * Container component for the login page
 */
class LoginPage extends React.Component {
    constructor(props){
        super(props)

        this.handleAuthLoginUser = this.handleAuthLoginUser.bind(this)
    }
    handleAuthLoginUser({email, password}){
        this.props.dispatch(authLoginUser({email, password}))
    }
    render(){
        return <Login authLoginUser={this.handleAuthLoginUser} />
    }
}

class AuthSuccess extends React.Component {
    render(){
        return (<Redirect to={constants.AUTH_ROOT_PATH} />)
    }
}

export default 
    connect( state => ({
        // inverting value because we want to render wrappedcomponent when NOT authenticated in this case
        // Important to also check for only token missing, in case it is deleted outside of the app,
        // or else it fails with recursive redirects and an error in the browser, as we can
        // still be authenticated in state, but missing token.
        isAuthenticated: !state.auth.isAuthenticated || !localStorage.getItem('token'),
        isAuthenticating: state.auth.isAuthenticating
    }))
    (authWrapper({
        AuthenticatingComponent: () => (<Authenticating />), // todo: Show loading component
        FailureComponent: () => (<AuthSuccess />)
    })
    (LoginPage))