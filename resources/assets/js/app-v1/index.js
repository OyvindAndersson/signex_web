/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Lodash, axios and other helpers.
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
import { Main } from './common'

/**
 * Bring in the store and the persistor object
 */
const { store, persistor } = require('./setup')

/**
 * Bring in the routes for the app
 */
const rootRoutes = require( './setup/routes')

/**
 * Root component
 */
const App = (
	<Provider store={store}>
		<PersistGate loading={(<h1>Loading app...</h1>)} persistor={persistor}>
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
	console.debug('%c 3/3 [App initialized]', 'color: #DD3388')
	console.debug('==')
}



