import React from 'react'
import {Route} from 'react-router-dom'
import {AuthRoute} from '../auth'

import LandingPage from './components/landingPage'
import appStore from '../'

/* Route for 404 */
const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)
/** Test... */
const Home = () => (
    <div>
        <h2>HOME HOME HOME!</h2>
    </div>
)

console.log("Common routes")
const {auth} = appStore.getState()

/* Main app routes *//*
const commonRoutes = [
    createAuthRoute( "app", { component: App, path: "/app", auth: auth }),
    createRoute( "nomatch404", { component: NoMatch })
]*/
const commonRoutes = [
    <AuthRoute path="/" auth={auth} component={LandingPage} key="app-route-key" />,
    <Route component={NoMatch} key="nomatch-route-key" />
]

export default commonRoutes;