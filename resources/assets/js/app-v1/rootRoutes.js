/**
 * Wrap up all routes, from all modules, that the app is dependent upon.
 */
import React from 'react'
import {Switch} from 'react-router-dom'
import {routes as commonRoutes} from './common'
import {routes as authRoutes, AuthRoute} from './auth'

/**
 * Full list of both explicit components and implicit within
 * named route object literals.
 * Either: [Component] or [{... Component}]
 * Named routes are defined as:
 *      { path: '', title: '', component: RouteComponent}
 * Non-named routes are simply:
 *      RouteComponent
 * explicitly.
 */
const rootRouteSrc = [...authRoutes, ...commonRoutes]

/**
 * All components, both explicit and implicit
 */
const rootRouteComponents = rootRouteSrc.map((route) => {
    // if not a named component, it is passed in explicitly
    return typeof route.component !== 'undefined' ? route.component : route
})

/**
 * Only {path, title} from named routes.
 */
export const rootPublicRouteNames = rootRouteSrc.filter((route) => {
    var {path, title, component} = route
    if(component && component.type !== AuthRoute){
        return {path, title}
    }
}).reverse() 

export const rootAuthRouteNames = rootRouteSrc.filter((route) => {
    var {path, title, component, role} = route
    if(component && component.type === AuthRoute){
        return {path, title, role}
    }
}).reverse()

/**
 * All routecomponents to be used within a Router component
 * All route components must have Key set, as this renders
 * an array of comps.
 */
const rootRoutes = (
    <Switch>
        {rootRouteComponents}
    </Switch>
)

export default rootRoutes;