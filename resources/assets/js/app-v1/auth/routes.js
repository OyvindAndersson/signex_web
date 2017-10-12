import React from 'react'
import {Route} from 'react-router-dom'
import renderer from 'react-test-renderer'

import Login from './components/login'


/* Main app routes */
const authRoutes = (
    <Route path="/login" component={Login}/>
)

export default authRoutes;