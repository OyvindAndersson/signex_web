import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router'

import {Container, Row, Col} from 'reactstrap'
import NewClientForm from '../components/new-client-form'

/**
 * Landingpage for the Client model
 * @todo Break up into components
 */
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
            <h3>Clients</h3>
        );
    }
}