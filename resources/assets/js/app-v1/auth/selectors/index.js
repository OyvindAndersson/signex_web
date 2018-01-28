import {createSelector} from 'reselect'
import {schema, denormalize} from 'normalizr'

import types from '../actionTypes'
import { userSchema, userListSchema } from '../schema'
import { createHasActiveRequestSelectorFor, createFailedRequestSelectorFor } from 'AppUtils/redux/requests/selectors'

/** Selector to check if a login action is active */
export const isVerifyLoginActive = createHasActiveRequestSelectorFor(types.AUTH_VERIFY_LOGIN)
/** Selector to check if a veriy token action is active */
export const isVerifyTokenActive = createHasActiveRequestSelectorFor(types.AUTH_VERIFY_TOKEN)
/** Selector to check if token verification failed */
export const verifyTokenError = createFailedRequestSelectorFor(types.AUTH_VERIFY_TOKEN)
/** Checks if an authentication has been done, so the UI can respond fluently to route-changes.
 * If the user actually is not authenticated, no requests can be made...
 * This is updated in a custom store middleware at every request type to the server.
 */
export const isClientAuthenticated = state => { 
    // Return state auth-state first if set, if not - check local flag
    return state.auth.isAuthenticated ? 
        state.auth.isAuthenticated : 
        (window.localStorage ? window.localStorage.getItem('isAuthenticated') == 'true' : false)
}


//-----------------------------------------
const getUsers = state => state.entities.users.byId

const getAllUserIds = state => state.entities.users.allIds

export const getDenormalizedUsers = createSelector(
    [getAllUserIds, getUsers],
    (userIds, users) => {
        return denormalize(userIds, userListSchema, {users})
    }
)
