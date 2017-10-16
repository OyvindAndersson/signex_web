import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import authWrapper from './authWrapper'
import Login from '../dumb/login'
// TODO: Get "Loading" component

export default 
    connect( state => ({
        isAuthenticated: !state.auth.isAuthenticated, // inverting value because this is not a
        isAuthenticating: state.auth.isAuthenticating
    }))
    (authWrapper({
        AuthenticatingComponent: () => (<h3>Logging in...</h3>), // todo: Show loading component
        FailureComponent: () => (<Redirect to='/' />)
    })
    (Login))