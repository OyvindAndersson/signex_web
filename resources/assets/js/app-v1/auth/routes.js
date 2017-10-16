import React from 'react'
import {Route} from 'react-router-dom'

import { LOGIN_PATH } from './constants'
import LoginPage from './components/smart/loginPage'

console.log("Auth routes")


/* auth module routes */
const authRoutes = [
    <Route path={LOGIN_PATH} component={LoginPage} key="login-route-key" />
]

export default authRoutes