import types from './actionTypes'
import { jtwDecode } from 'jwt-decode'

/**
 * Initial auth state
 */
const initialState = {
  user: null,
  isFetching: false,
  isAuthenticating: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  error: null
}

/**
 * Auth Reducer - Handles the Auth state object
 * @param {*} state 
 * @param {*} action 
 */
export default function(state = initialState, action) {

    switch (action.type) {   
      case types.AUTH_LOGIN_USER: {
        return {
          ...state, 
          isFetching: false,
          isAuthenticating:true, 
          isAuthenticated:false
        }
      }

      case types.AUTH_LOGIN_USER_REJECTED: {
        return {
          ...state, 
          isFetching: false, 
          isAuthenticating: false,
          isAuthenticated:false, 
          error: action.payload
        }
      }

      case types.AUTH_LOGIN_USER_SUCCESS: {
        return {
          ...state, 
          isFetching: false, 
          isAuthenticating: false,
          isAuthenticated:true,
          user: action.payload
        }
      }

      case types.AUTH_TOKEN: {
        return {
          ...state, 
          isFetching: true,
        }
      }

      case types.AUTH_TOKEN_REJECTED: {
        return {
          ...state, 
          isFetching: false, 
          isAuthenticated:false,
          ...action.payload
        }
      }

      case types.AUTH_TOKEN_SUCCESS: {
        return {
          ...state, 
          isFetching: false, 
          isAuthenticated:true,
          user: action.payload.user
        }
      }
          
      default:
          return state;
    }
}