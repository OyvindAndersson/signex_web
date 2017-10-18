import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import constants from '../constants'

export const AuthRoute = ({ component: Component, ...rest }) => (  
    <Route {...rest} render={props => (
      localStorage.getItem('token') ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: constants.LOGIN_PATH,
          state: { from: props.location }
        }}/>
      )
    )}/>
  )