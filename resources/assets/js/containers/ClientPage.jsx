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
export default class ClientPage extends Component {
    render(){
        return(
            <h3>Client Page</h3>
        );
    }
}