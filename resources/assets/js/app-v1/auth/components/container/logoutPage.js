import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import types from '../../actionTypes'
import constants from '../../constants'

class LogoutPage extends React.Component {
    componentDidMount(){
        this.props.dispatch({type: types.AUTH_LOGOUT_USER})
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

export default connect((state) => ({
    isAuthenticated: state.auth.isAuthenticated
}))(LogoutPage)