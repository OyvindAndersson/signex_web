
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap')

/**
 * Now we define our app, initialize and bootstrap the needed elements
 * like the store, router etc. All nav-able pages must be imported
 * here.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Provider from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import configureStore from './store'
import {Navbar} from './common'
import appRoutes from './common/routes'


/** 
 *   APP
 */
const appStore = configureStore();
const App = (appStore, appRoutes) => {
	render() {
		return(
		<Provider store={appStore}>
			<Router>
				<div className="signex-wrapper">
					<Navbar />
					{appRoutes}
				</div>
			</Router>
		</Provider>
		)
	}
}


/** 
 * Check if we already have a valid token - if so, authenticate and fetch user details.
 * @todo Does this work when token expires?
 */
const token = localStorage.getItem('token');
if(token && jwtDecode(token) ){
    // Authenticate token
    appStore.dispatch({ type: AUTH_USER });
    // Load auth-user info
    appStore.dispatch(fetchAuthUser())
}

/**
 *   RENDER ROOT
 */
if(document.getElementById('app')){ 
	ReactDOM.render(App, document.getElementById('app'));
}


