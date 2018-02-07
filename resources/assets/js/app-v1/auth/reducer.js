import types from './actionTypes'
import constants from './constants'

/**
 * Initial auth state
 */
const initialAuthState = {
  user: null,
  isAuthenticated: false
}

/**
 * Reducer
 * @param {*} state 
 * @param {*} action 
 */
export default function authReducer(state = initialAuthState, action){
  switch(action.type){
    case types.AUTH_VERIFY_LOGIN: return verifyLoginHandler(state, action)
    case types.AUTH_VERIFY_TOKEN: return verifyTokenHandler(state, action)
    case types.AUTH_LOGOUT: return { ...state, isAuthenticated: false, user: null }
    default:
      return {
        ...state,
        //isAuthenticated: false
      }
  }
}

/**
 * Handle login action success
 * @param {*} state 
 * @param {*} action 
 */
function verifyLoginHandler(state, action){
  const { payload: { data: { user }}} = action
  return {
    ...state,
    isAuthenticated: true,
    user
  }
}

/**
 * Handle verify token action success
 * @param {*} state 
 * @param {*} action 
 */
function verifyTokenHandler(state, action){
  const { payload: { data: { user }}} = action
  return {
    ...state,
    isAuthenticated: true,
    user
  }
}