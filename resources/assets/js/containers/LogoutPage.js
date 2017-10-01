import React,{Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Redirect} from 'react-router-dom'
import * as actions from '../actions/authActions'

class LogoutPage extends Component {
    componentWillMount(){
        this.props.logoutUser();
    }

    render(){
        if(!this.props.authenticated){
            return(<Redirect to="/login" />);
        }
        return (
            <div>
            </div>
        );
    }
}

export default withRouter(connect(null,actions)(Logout));