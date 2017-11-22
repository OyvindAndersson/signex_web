
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
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import appStore from './store'
import {Main} from './common'

console.log("Initializing app...")
//console.log(SIGNEX)

/** Run initial auth-check and fetch user details */
let {initAuth} = require('./auth')
initAuth(appStore)

const rootRoutes = require( './appRoutes')

/**
 * Root component
 */
const App = (
	<Provider store={appStore}>
		<Router>
			<Main>
				{rootRoutes.routes}
			</Main>
		</Router>
	</Provider>
)

/**
 *   RENDER ROOT
 */
if(document.getElementById('app')){ 
	ReactDOM.render(App, document.getElementById('app'));
}


