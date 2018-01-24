import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import {AuthRoute, LoginPage, LogoutPage} from 'Auth'
import DashboardPage from 'Common/components/DashboardPage'
import PageNotFound from 'Common/components/PageNotFound'
import ClientsPage from 'Clients/components/ClientsPage'
//import OrdersPage from './orders/components/ordersPage'

/**
 * Main app routes, public and auth
 */
export const routes = (
    <Switch onChange={ handleRouteChange }>
        <Route exact path="/" render={() => (<Redirect to="/login" />)} />
        <Route path="/login" component={LoginPage} />
        <AuthRoute path="/dashboard" component={DashboardPage} />
        <AuthRoute path="/clients" component={ClientsPage} />
        {/*<AuthRoute path="/orders" component={OrdersPage} />*/}
        <AuthRoute exact path="/logout" component={LogoutPage} />
        <Route component={PageNotFound} />
    </Switch>
)

function handleRouteChange(prev, next){
    console.log(prev, next)
}

/**
 * Main app links - used by navbars
 * Seperateb by public/auth
 */
export const links = {
    public: [
        { to: '/login', title: 'Login' }
    ],
    private: [
        { to: '/dashboard', title: 'Landing page' },
        { to: '/clients', title: 'Clients' },
        { to: '/orders', title: 'Orders' },
        { to: '/logout', title: 'Logout' }
    ]
}