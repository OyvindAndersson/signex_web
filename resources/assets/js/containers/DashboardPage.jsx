import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {withRouter} from 'react-router'

@connect((store) => {
    return {
        user: store.auth.user,
        error: store.auth.error,
        authenticated: store.auth.authenticated
    };
}, withRouter)
export default class DashboardPage extends Component {
    render(){
        const { authenticated } = this.props;
        if(!authenticated){
            return(
                <Redirect to={ {pathname: '/login', state: { from: '/'}} } />
            );
        }
        return(
            <h3>Dashboard Page</h3>
        );
    }
}