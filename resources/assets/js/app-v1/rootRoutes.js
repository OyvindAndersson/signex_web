/**
 * Wrap up all routes, from all modules, that the app is dependent upon.
 */
import React from 'react'
import {Switch} from 'react-router-dom'

import commonRoutes from './common/routes'
import authRoutes from './auth/routes'

// All routes coming in must have a key set, as we 
// render them as a array/list
const rootRoutes = (
    <Switch>
        {authRoutes}
        {commonRoutes}
    </Switch>
)

export default rootRoutes;
