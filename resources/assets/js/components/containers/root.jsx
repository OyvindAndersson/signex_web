import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

import jwtDecode from 'jwt-decode'

import configureStore from '../../stores'
import {AUTH_USER} from '../../actions/types'
import {fetchAuthUser, logoutUser} from '../../actions/authActions'

/*
    IMPORT APP PAGES
*/
import NavBar from '../navbar'
import Logout from '../logout'
import DashboardPage from './dashboard-page'
import LoginPage from './login-page'

/* 
    APP STORE
*/
const appStore = configureStore();
const token = localStorage.getItem('token');

/** Check if we already have a valid token - if so, authenticate and fetch user details. */
if(token && jwtDecode(token) ){
    appStore.dispatch({type: AUTH_USER});
    appStore.dispatch(fetchAuthUser())
}


/*
    RENDER ROOT
 */
if(document.getElementById('app')){
    ReactDOM.render(
    <Provider store={appStore}>
        <Router>
            <div>
                <NavBar />
                <Route exact path="/" component={DashboardPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/logout" component={Logout}/>
            </div>
        </Router>
    </Provider>
    , document.getElementById('app'));
}
