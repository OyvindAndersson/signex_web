import React from 'react'
import {Route, Redirect} from 'react-router-dom'

/**
 * 
 * @param {*} path 
 * @param {*} title 
 * @param {*} component 
 * @param {*} roles 
 * @deprecated
 */
export function namedRoute(path, title, component, roles = []){
    return { 
        path: path, 
        title: title, 
        component: component,
        roles: roles
    }
}

/**
 * Wrapper function for React.createElement, that simplifies creating
 * routes for modules.
 * @param {A unique name to identify the route} identifier
 * @param {component type to pass in with React.createElement} component 
 * @param {Props to pass in with React.createElement} props 
 * @deprecated
 */
export function createRoute(name, props) {
    const key = `${props.name}-key`
    return (
        <Route {...props} key={key} />
    )
    //return React.createElement('route', ...props);
}

/**
 * 
 * @param {*} name 
 * @param {*} props 
 * @deprecated
 */
export function createAuthRoute(name, props) {
    const key = `${props.name}-key`
    const {component, auth, ...rest} = props
    
    return (
        <Route {...rest} key={key} render={props => {return (
            auth.isAuthenticated ? (
                <component {...rest} />
            ) : (
                <Redirect to={{ pathname:'/login', state: { from: props.location}}} />
            )
        )}} />
    )
}