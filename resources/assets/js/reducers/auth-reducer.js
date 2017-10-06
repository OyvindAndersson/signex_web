import {
  AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_REJECTED, 
  FETCH_AUTH_USER_SUCCESS, FETCH_AUTH_USER_REJECTED,
  LOGOUT_USER
} from '../actions/types';
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
      case AUTH_USER: {
        return {...state,authenticated:true}
      }

      case AUTH_USER_SUCCESS: {
        return {...state, authenticated:true, user:action.payload.user}
      }

      case AUTH_USER_REJECTED: {
        return {...state, authenticated:false, user:null}
      }

      case FETCH_AUTH_USER_SUCCESS: {
        return {...state, user:action.payload}
      }

      case FETCH_AUTH_USER_REJECTED: {
        return {...state, error:action.payload}
      }

      case LOGOUT_USER: {
        return {...state, authenticated:false}
      }
          
      default:
          return state;
    }
}