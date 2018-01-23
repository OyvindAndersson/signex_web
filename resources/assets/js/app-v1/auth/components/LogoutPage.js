import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import types from 'Auth/actionTypes'
import constants from 'Auth/constants'
import { isClientAuthenticated } from 'Auth/selectors'
import { logoutAction } from 'Auth/actions';

/**
 * Logout page container
 */
class LogoutPage extends React.Component {
    componentDidMount(){
        if(this.props.logout){
            localStorage.setItem('isAuthenticated', false)
            this.props.logout()
        }
    }
    componentWillReceiveProps(props){
        if(!props.isAuthenticated) {
            console.log('LogoutPage - isAuthenticated ', `[${props.isAuthenticated}]`)
        }
    }
    render(){
        const {isAuthenticated} = this.props
        if(!isAuthenticated){
            return(<Redirect to={constants.LOGIN_PATH}/>)
        }
        else{
            return(<div>Logging out...</div>)
        }
        
    }
}

function mapStateToProps(state){
    return {
        isAuthenticated: isClientAuthenticated(state)
    }
}

function mapDispatchToProps(dispatch){
    return {
        logout: () => dispatch(logoutAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage)