/**
 * The API file takes care of all calls to the backend,
 * to avoid cluttering the action creators, as well
 * as to give API access to native js code.
 * 
 * This common api.js is used by other modules to reuse
 * common code shared for all api.js's
 */
import axios from 'axios'

  /** This header must be attached to all authed-requests to the API */
export function apiRequestHeaders(){ return {authorization:`Bearer`+localStorage.getItem('token')}}

/** Default api response action types for success/error */
export const API_SUCCESS = '_SUCCESS'
export const API_REJECTED = '_REJECTED'
export const API_INVALID_REQUEST = 'API_INVALID_REQUEST'

/**
 * Generic API request that starts of with @param baseAction and returns either
 * [baseAction]_SUCCESS or [baseAction]_REJECTED. If any initial errors occur
 * before the request is made, a API_INVALID_REQUEST action is dispatched
 * 
 * @param {string} endpoint Required API endpoint
 * @param {string} baseAction Required base action type (i.e: FETCH_USERS)
 * @param {function} normalizer Optional normalizing function to normalize the response data.
 * @param {object} requestPayload Optional data payload to send with the initial request
 * @return {object} Dispatched object {type: *, payload: *} 
 */
export const apiRequest = (endpoint, baseAction, normalizer = null, requestPayload = null) => {
    /**
     * @param {function} dispatch Auto-passed by redux when this action is dispatched
     */
    return (dispatch) => {
        if(!baseAction){
            return dispatch({
                type: API_INVALID_REQUEST,
                payload: { error: "API REQUEST: Base action not defined! Must have a base action." }
            })
       }

       // Initial request, to start the "fetching..." state
        dispatch({
            type: baseAction,
            payload: requestPayload
        })

        // do the async request to API
        return axios.get(`api/${endpoint}`, { headers: apiRequestHeaders() })
            .then((response) => {
                if(normalizer && typeof normalizer === 'function'){
                    return dispatch({
                        type: `${baseAction}${API_SUCCESS}`,
                        payload: normalizer(response.data)
                    })
                }
                else {
                    return dispatch({
                        type: `${baseAction}${API_SUCCESS}`,
                        payload: response.data
                    })
                }
            })
            .catch((err) => {
                return dispatch({
                    type: `${baseAction}${API_REJECTED}`,
                    payload: { message: err.message, reason: err.response ? err.response.data : '' }
                })
            })
    }
}