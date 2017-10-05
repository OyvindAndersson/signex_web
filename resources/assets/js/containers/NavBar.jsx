import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

@connect((store) => {
    return {
        authenticated: store.auth.authenticated
    };
}, withRouter)
export default class NavBar extends Component {
    render(){

        const { authenticated } = this.props;
        if(!authenticated){
            return(
                <Redirect to={ {pathname: '/login', state: { from: '/'}} } />
            );
        }
        if(authenticated){
            return(
                <nav>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/clients">Clients</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            );
        }
        else {
            return(
                <nav>
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
            );
        }
        
    }
}