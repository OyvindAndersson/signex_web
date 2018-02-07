/**
 * Main API helpers
 */
import invariant from 'invariant'
import { BASE_API_URL } from './constants'
import { restActionTypes } from './utils/redux/constants'
import { createRestRequestAction } from 'AppUtils/redux/utils/createRequestAction'

/**
 * A helper function to create an API request for a specific module,
 * using the subsystems in this app; cache, request queueing, and redux
 * 
 * @param {string} type Request type. Either GET or POST
 * @param {string} moduleId Module ID, to determine the route/context of the request (i.e: 'users')
 * @param {string} restActionType Rest action type (i.e: 'create', 'delete' etc)
 * @param {bool} shouldCache If the response should be persisted. Note that this must be 
 * setup in ./setup/store using redux-persist
 * @param {function} cacheDirtySelector A selector for the entity cache state.
 */
export const createApiRequestAction = (
    type = 'GET', 
    moduleId, 
    restActionType,
    shouldCache = false, 
    cacheDirtySelector = null 
) => {
    invariant(
        _.isString(moduleId) && _.isString(restActionType), 
        'Expected moduleId and restactiontype to be valid string.'
    )

    if( type == 'GET' || type == 'get'){
        var apiCall = (payload) => apiGetRest(moduleId, restActionType, payload)
        
    } else {
        apiCall = (payload) => apiPostRest(moduleId, restActionType, payload)
    }
    
    return createRestRequestAction(
        moduleId,
        restActionType,
        apiCall,
        shouldCache,
        cacheDirtySelector
    )
}

/**
 * A generic POST request to the API
 * 
 *  @param {string|required} apiRoute The endpoint on the api from which to post to
 *  @param {object|mixed} payload POST payload
 */
 export const apiPost = (apiRoute, payload) => {
    console.log(`API POST: [${apiRoute}] with [${payload}]`)

    return axios.post(`${BASE_API_URL}/${apiRoute}`, payload)
    .then( response => {
        return { response: {
            headers: response.headers,
            data: response.data,
            status: response.status,
            request: response.request
        } }
    }).catch( error => {
        return { error: {
            headers: error.response.headers,
            data: error.response.data,
            status: error.response.status,
            request: error.response.request
        } }
    })
 }

/**
 * A generic GET request to the API
 * 
 * @param {string} apiRoute API enpoint to send the request
 * @param {object|mixed} payload Data to send with the request
 */
 export const apiGet = (apiRoute, payload) => {
    console.debug(`API GET: [${apiRoute}] with [${payload}]`)

    return axios.get(`${BASE_API_URL}/${apiRoute}`, payload)
    .then( response => {
        return { response: {
            headers: response.headers,
            data: response.data,
            status: response.status,
            request: response.request
        } }
    }).catch( error => {
        return { error: {
            headers: error.response.headers,
            data: error.response.data,
            status: error.response.status,
            request: error.response.request
        } }
    })
 }

/**
 * Simple helper/wrapper function to set up a GET request to the API endpoint
 *  related to the module in question, with any payload.
 * 
 *  @param {string} moduleId The module ID (I.e: 'users' module)
 * @param {string} restActionType REST action type
 *  @param {object} payload Payload to send to API
 */
 export const apiGetRest = (moduleId, restActionType, payload = null) => {
     return apiGet(getApiRouteForModule(moduleId, restActionType), payload)
 }

/**
 * Simple helper/wrapper function to set up a POST request to the API endpoint
 * related to the module in question, with any payload.
 * 
 * @param {string} moduleId The module ID (I.e: 'users' module)
 * @param {string} restActionType REST action type
 * @param {object} payload Payload to send to API
 */
 export const apiPostRest = (moduleId, restActionType, payload = null) => {
     return apiPost(getApiRouteForModule(moduleId, restActionType), payload)
 }

/**
 * Generates an API route for a module, based on the expectation that
 * the name of the module is the same name as the API route/endpoint.
 * 
 * @param {string} moduleId The module id, expected to be same as API route
 * @param {string} restActionType The rest action to perform/request
 */
 export const getApiRouteForModule = (moduleId, restActionType) => {
    const mod = moduleId.toLowerCase()
  
    switch(restActionType){
      case restActionTypes.LOAD:
        return `${mod}`
      case restActionTypes.CREATE:
        return `${mod}/create`
      case restActionTypes.UPDATE:
        return `${mod}/update`
      case restActionTypes.DELETE:
        return `${mod}/delete`
      default:
        return `${mod}`
    }
  }