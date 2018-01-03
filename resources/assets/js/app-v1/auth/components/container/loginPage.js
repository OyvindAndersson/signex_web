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

        this.state = {
            isAuthenticating: false,
            isAuthenticated: props.isAuthenticated ? props.isAuthenticated : false
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            isAuthenticated: nextProps.isAuthenticated,
            isAuthenticating: nextProps.isAuthenticating
        })
    }
    handleAuthLoginUser({email, password}){
        this.props.dispatch(authLoginUser({email, password}))
    }
    render(){
        const {isAuthenticated} = this.state
        
        if(isAuthenticated){
            return <AuthSuccess />
        }
        else {
            return <Login authLoginUser={this.handleAuthLoginUser} 
            isAuthenticating={this.state.isAuthenticating} />
        }
    }
}

export default connect( state => ({
    isAuthenticated: state.auth.isAuthenticated && localStorage.getItem('token'),
    isAuthenticating: state.auth.isAuthenticating
}))(LoginPage)

/**
 * Redirection component when authenticated. No need to view the login page then...
 */
class AuthSuccess extends React.Component {
    render(){
        return (<Redirect to={constants.AUTH_ROOT_PATH} />)
    }
}