import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {AuthRoute} from './auth'

import {LoginPage} from './auth'
import LogoutPage from './auth/components/container/logoutPage'
import DashboardPage from './common/components/dashboardPage'
import ClientsPage from './clients/components/clientPage'
import OrdersPage from './orders/components/ordersPage'

const NoMatch = ({location}) => (
    <div>No match for <code>{location.pathname}</code></div>
)
/**
 * Main app routes, public and auth
 */
export const routes = (
    <Switch>
        <Route exact path="/" render={() => (<Redirect to="/login" />)} />
        <Route path="/login" component={LoginPage} />
        <AuthRoute path="/dashboard" component={DashboardPage} />
        <AuthRoute path="/clients" component={ClientsPage} />
        <AuthRoute path="/orders" component={OrdersPage} />
        <AuthRoute exact path="/logout" component={LogoutPage} />
        <Route component={NoMatch} />
    </Switch>
)

/**
 * Main app links - used by navbars
 * Seperateb by public/auth
 */
export const links = {
    public: [
        { to: '/login', title: 'Login' },
    ],
    private: [
        { to: '/dashboard', title: 'Landing page' },
        { to: '/clients', title: 'Clients' },
        { to: '/orders', title: 'Orders' },
        { to: '/logout', title: 'Logout' }
    ]
}