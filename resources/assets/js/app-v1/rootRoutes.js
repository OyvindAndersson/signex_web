/**
 * Wrap up all routes, from all modules, that the app is dependent upon.
 */
import React from 'react'
import {Switch} from 'react-router-dom'

import commonRoutes from './common/routes'
import authRoutes from './auth/routes'

// Evaluate commonRoutes last, as it handles 404/nomatch
const rootRoutes = (
    <Switch>
        {authRoutes}
        {commonRoutes}
    </Switch>
)

export default rootRoutes;
