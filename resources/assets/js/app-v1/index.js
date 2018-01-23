
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
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { store, persistor } from './setup'
import { Main } from './common'

console.debug("Initializing app...")

/** Run initial auth-check and fetch user details */
let { initAuth } = require('./auth')
initAuth(store)

//console.log(store.getState())

const rootRoutes = require( './routes')

/**
 * Root component
 */
const App = (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Router>
				<Main navLinks={rootRoutes.links}>
					{rootRoutes.routes}
				</Main>
			</Router>
		</PersistGate>
	</Provider>
)

/**
 *   RENDER ROOT
 */
if(document.getElementById('app')){ 
	ReactDOM.render(App, document.getElementById('app'));
}



