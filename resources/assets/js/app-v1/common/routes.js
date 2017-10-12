import React from 'react'
import {Route} from 'react-router-dom'


/* Route for 404 */
const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)

/* Main app routes */
const commonRoutes = (
    <Route component={NoMatch}/>
)

export default commonRoutes;