import types from './actionTypes'
import authApi from './api'
import {apiRequest} from '../common/api'
import {usersNormalizer} from './schema'

/**
 * A simple action to kick off the state of "isFetching"
 * when a login request is sent
 * @param {email: string, password: string} credentials 
 */
export function requestLogin(credentials){
    return {
        type: types.AUTH_LOGIN_USER
    }
}

/**
 * Creates an action that queries the API to login with
 * the credentials. User object and token returns
 * @param {email: string, password: string} credentials 
 */
export function authLoginUser(credentials){
    return (dispatch) => {
        
        // Kick off some state before we contact the API,
        // so the UI can respond.
        dispatch({ type: types.AUTH_LOGIN_USER })

        // Send login request with credentials to the API
        return authApi.requestLoginWith(credentials)
        .then((response) => {
            // Login succes.
            localStorage.setItem("token", response.data.token);
            dispatch({
                type: types.AUTH_LOGIN_USER_SUCCESS,
                payload: response.data
            })
        })
        .catch((err) => {
            // request rejected
            dispatch({
                type: types.AUTH_LOGIN_USER_REJECTED,
                payload: { message: err.message, reason: err.response.data }
            })
        })
    }
}

export function authUserToken(token = localStorage.getItem('token')){
    return (dispatch) => {
        
        dispatch({
            type: types.AUTH_TOKEN
        })

        return authApi.authToken(token)
        .then((response) => {
            // token auth succes. Update locally stored token to the refreshed-token
            localStorage.setItem("token", response.data.newToken);
            dispatch({
                type: types.AUTH_TOKEN_SUCCESS,
                payload: response.data
            })

            
        })
        .catch((err) => {
            // token rejected
            if(token){
                localStorage.removeItem("token")
            }
            dispatch({
                type: types.AUTH_TOKEN_REJECTED,
                payload: { message: err.message, reason: err.response.data }
            })
        })
    }
}

export function usersFetchAll() { 
    return apiRequest('users', types.AUTH_FETCH_USERS, null, usersNormalizer) 
}