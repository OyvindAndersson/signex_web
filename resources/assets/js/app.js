
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap')
require('./utils/brreg')
import 'react-toastify/dist/ReactToastify.min.css'


/**
 * Now we define our app, initialize and bootstrap the needed elements
 * like the store, router etc. All nav-able pages must be imported
 * here.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'

import jwtDecode from 'jwt-decode'
import configureStore from './stores'
import {AUTH_USER} from './actions/types'
import {fetchAuthUser, logoutUser} from './actions/authActions'

/*
    IMPORT APP PAGES / CONTAINERS
*/
// Main Layout
import NavBar from './containers/NavBar'
import DashboardPage from './containers/DashboardPage'

// Client pages
import ClientPage from './containers/ClientPage'

// AUTH Pages
import LoginPage from './containers/LoginPage'
import LogoutPage from './containers/LogoutPage'

/* 
    APP STORE
*/
const appStore = configureStore();
const token = localStorage.getItem('token');

/** Check if we already have a valid token - if so, authenticate and fetch user details. */
if(token && jwtDecode(token) ){
    // Authenticate token
    appStore.dispatch({type: AUTH_USER});
    // Load auth-user info
    appStore.dispatch(fetchAuthUser())
}

/* Route for 404 */
const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)

/*
    RENDER ROOT
 */
if(document.getElementById('app')){
    ReactDOM.render(
    <Provider store={appStore}>
        <Router>
            <div>
                <NavBar />
                <Switch>
                <Route exact path="/" component={DashboardPage}/>
                <Route exact path="/clients" component={ClientPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/logout" component={LogoutPage}/>
                <Route component={NoMatch}/>
                </Switch>
            </div>
        </Router>
    </Provider>
    , document.getElementById('app'));
}



