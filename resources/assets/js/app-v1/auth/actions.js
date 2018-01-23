import actionTypes from './actionTypes'
import { apiPost, apiGet } from '../api'
import apiRoutes from './api'
import { createRequestAction } from "AppUtils/redux/utils/createRequestAction"

/**
 * Verify login action
 * Dispatched from a login form submit
 */
const verifyLogin = (credentials) => { return apiPost(apiRoutes.API_LOGIN, credentials) }
export const verifyLoginAction = createRequestAction(actionTypes.AUTH_VERIFY_LOGIN, verifyLogin)

/**
 * Token verification action
 * Dispatched at every new request
 * Simply waits for a 200 response to know if verification succeeded
 */
const verifyToken = () => { return apiPost(apiRoutes.API_VERIFY_TOKEN) }
export const verifyTokenAction = createRequestAction(actionTypes.AUTH_VERIFY_TOKEN, verifyToken)

/**
 * Logout action
 */
const logout = () => { return apiPost(apiRoutes.API_LOGOUT) }
export const logoutAction = createRequestAction(actionTypes.AUTH_LOGOUT, logout)