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

        // Always redirect to login page if not authenticated.
        const { authenticated } = this.props;
        if(!authenticated){
            return(
                <Redirect to={ {pathname: '/login', state: { from: '/'}} } />
            );
        }

        // Links if authed
        const authLinks = [
            { to: '/', title: 'Dashboard' },
            { to: '/clients', title: 'Clients' },
            { to: '/logout', title: 'Logout' }
        ]
        // Links if guest
        const guestLinks = [
            { to: '/login', title: 'Login' }
        ]

        // Map links to display
        // @todo - Remove <li> portion, as the Link component will be passed to a component that 
        // handles display
        const links = authenticated ? 
            authLinks.map( (link) => <li key={link.title}><Link to={link.to}>{link.title}</Link></li> ) :
            guestLinks.map( (link) => <li key={link.title}><Link to={link.to}>{link.title}</Link></li> );

        // Render navbar - @todo: Use component..
        return(
            <nav>
                <ul>
                    {links}
                </ul>
            </nav>
        );
        
    }
}