/**
 * Main API helpers
 */

 import { BASE_API_URL } from './constants'

 /**
  * 
  * @param {string|required} apiRoute The endpoint on the api from which to post to
  * @param {object|mixed} payload POST payload
  */
 export const apiPost = (apiRoute, payload) => {
    //console.debug(`API POST: [${apiRoute}] with [${payload}]`)

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

 export const apiGet = (apiRoute, payload) => {
    //console.debug(`API GET: [${apiRoute}] with [${payload}]`)

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

 export const apiGetCachable = (apiRoute, payload, cacheKey) => {
     // Check the local cache store
     
     // Return promise with either cached data, or server data
 }