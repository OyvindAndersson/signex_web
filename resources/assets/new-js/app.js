
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
import {fetchAuthUser, authUserToken, logoutUser} from './actions/authActions'
import appRoutes from './routes'

import NavBarContainer from './containers/NavBarContainer'
import PageWrapper from './containers/PageWrapper'

/* 
    APP STORE
*/
const appStore = configureStore();
const token = localStorage.getItem('token');

/** 
 * Check if we already have a valid token - if so, authenticate and fetch user details.
 * @todo Does this work when token expires?
*/
if(token && jwtDecode(token) ){
    // Authenticate token
    appStore.dispatch({ type: AUTH_USER});
    // Load auth-user info
    appStore.dispatch(fetchAuthUser())
}

/*
    RENDER ROOT
 */
if(document.getElementById('app')){
    ReactDOM.render(
    <Provider store={appStore}>
        <Router>
            <div className="signex-wrapper">
                <NavBarContainer />
                <PageWrapper className="signex-main">
                    {appRoutes}
                </PageWrapper>
            </div>
        </Router>
    </Provider>
    , document.getElementById('app'));
}



