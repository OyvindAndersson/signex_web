import React from 'react'
import {Switch, Route} from 'react-router-dom'

// Main Layout
import DashboardPage from './containers/DashboardPage'

// Client pages
import ClientPage from './containers/ClientPage'

// AUTH Pages
import LoginPage from './containers/LoginPage'
import LogoutPage from './containers/LogoutPage'

/* Route for 404 */
const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)

/* Main app routes */
const appRoutes = (
    <Switch>
        <Route exact path="/" component={DashboardPage}/>
        <Route exact path="/clients" component={ClientPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/logout" component={LogoutPage}/>
        <Route component={NoMatch}/>
    </Switch>
)

export default appRoutes;