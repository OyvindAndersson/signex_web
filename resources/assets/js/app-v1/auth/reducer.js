import types from './actionTypes'
import constants from './constants'
import { handleActions } from 'redux-actions'
import { initialState } from '../utils/redux/requests/reducer';

/**
 * Initial auth state
 */
const initialAuthState = {
  user: null,
  isAuthenticated: false
}

function verifyLoginHandler(state, action){
  console.error(action)
  return {
    ...state,
    isAuthenticated: true
  }
}

export default handleActions(
  {
    [types.AUTH_VERIFY_LOGIN]: verifyLoginHandler
  },
  initialAuthState
)