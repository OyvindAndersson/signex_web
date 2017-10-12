import React, { Component } from 'react';
import { connect } from 'react-redux'
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
        
        return(
            <div>
                
                <h3>Dashboard Page</h3>
            </div>
        );
    }
}