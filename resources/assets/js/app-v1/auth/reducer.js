import types from './actionTypes';
import { jtwDecode } from 'jwt-decode'

const token = localStorage.getItem('token');

/**
 * Auth Reducer - Handles the Auth state object
 * @param {*} state 
 * @param {*} action 
 */
export default function(state = {
  user: {
    id: null,
    name: null,
    email: null,
    created_at: null,
    updated_at: null
  },
  authenticated: false,
  error: null
}, action) {

    switch (action.type) {   
      case types.AUTH_USER: {
        return {...state,authenticated:true}
      }

      case types.AUTH_USER_SUCCESS: {
        return {...state, authenticated:true, user:action.payload.user}
      }

      case types.AUTH_USER_REJECTED: {
        return {...state, authenticated:false, user:null}
      }

      case types.FETCH_AUTH_USER_SUCCESS: {
        return {...state, user:action.payload}
      }

      case types.FETCH_AUTH_USER_REJECTED: {
        return {...state, error:action.payload, authenticated:false}
      }

      case types.LOGOUT_USER: {
        return {...state, authenticated:false}
      }
          
      default:
          return state;
    }
}