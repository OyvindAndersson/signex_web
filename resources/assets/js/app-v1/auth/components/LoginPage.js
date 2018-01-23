import React from 'react'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'

import constants from 'Auth/constants'
import { verifyLoginAction } from "Auth/actions"
import { isVerifyLoginActive, isClientAuthenticated, isVerifyTokenActive } from "Auth/selectors";
import {exceptAuth} from './authHocs'
import LoginForm from './LoginForm'



/**
 * Container component for the login page
 */
class LoginPage extends React.Component {
    constructor(props){
        super(props)
        this.state = { isVerifyingLogin: false }
    }
    componentWillReceiveProps(nextProps){
        this.setState({ isVerifyingLogin: nextProps.isVerifyingLogin })
    }
    render(){
        return(<LoginForm authLoginUser={this.props.verifyLogin} isVerifyingLogin={this.state.isVerifyingLogin} /> )
    }
}

/**
 * The component to render if/when authentication is successful.
 * @param {*} props 
 */
const LoginSuccessful = (props) => {
    const {from} = props.location.state || { from: { pathname: constants.AUTH_ROOT_PATH }}

    if(from.pathname && from.pathname.indexOf('logout') !== -1){
        return <Redirect to={constants.AUTH_ROOT_PATH} />
    } else {
        return <Redirect to={from} />
    }
}


function mapStateToProps(state) {
    return {
        isAuthenticated: isClientAuthenticated(state),
        isVerifyingLogin: isVerifyLoginActive(state),
        isVerifyingToken: isVerifyTokenActive(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        verifyLogin: credentials => dispatch(verifyLoginAction( credentials ))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        exceptAuth({ ElseComponent: LoginSuccessful })(LoginPage)
    )
)