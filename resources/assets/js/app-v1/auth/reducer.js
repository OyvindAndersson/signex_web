import types from './actionTypes'
import constants from './constants'
import {API_SUCCESS, API_REJECTED} from '../common/api'
import { jtwDecode } from 'jwt-decode'

/**
 * Initial auth state
 */
const initialAuthState = {
  user: null,
  role: constants.AUTH_ROLE_GUEST,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
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
function authReducer(state = initialAuthState, action) {

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
          error: action.payload,
          user: null,
          token:null,
          role: constants.AUTH_ROLE_GUEST
        }
      }

      case types.AUTH_LOGIN_USER_SUCCESS: {
        return {
          ...state, 
          error: null,
          isFetching: false, 
          isAuthenticating: false,
          isAuthenticated:true,
          user: action.payload.user,
          token: action.payload.token,
          role: constants.AUTH_ROLE_ADMIN // TODO! Get from payload.
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
          isAuthenticating: false,
          isAuthenticated:false,
          role: constants.AUTH_ROLE_GUEST,
          error: action.payload,
          user: null,
          token:null
        }
      }

      case types.AUTH_TOKEN_SUCCESS: {
        return {
          ...state, 
          error: null,
          isFetching: false, 
          isAuthenticated:true,
          user: action.payload.user,
          token: action.payload.newToken, // Refreshed token
          role: constants.AUTH_ROLE_ADMIN // TODO: Get from payload!
        }
      }

      case types.AUTH_LOGOUT_USER: {
        localStorage.removeItem('token')
        return {
          ...state, 
          isFetching: false, 
          isAuthenticating: false,
          isAuthenticated:false,
          user: null,
          token: null,
          role: constants.AUTH_ROLE_GUEST
        }
      }
          
      default:
          return state;
    }
}

const initialUsersState = {
    isFetching: false,
    isDirty: false,
    byId: {},
    allIds: []
}
/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
function usersReducer(state = initialUsersState, action){
  switch(action.type){

    case `${types.AUTH_FETCH_USERS}`: {
      return {
          ...state,
          isFetching: true
      }
    }

    case `${types.AUTH_FETCH_USERS}${API_SUCCESS}`: {
      return {
          ...state,
          isFetching: false,
          isDirty: false,
          ...action.payload
      }
    }

    case `${types.AUTH_FETCH_USERS}${API_REJECTED}`: {
      return {
          ...state,
          isFetching: false,
          byId: {},
          allIds: []
      }
    }

    default:
      return state
  }
}

export default {
  authReducer,
  usersReducer
}