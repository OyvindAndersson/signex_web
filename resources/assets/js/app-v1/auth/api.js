/**
 * The API file takes care of all calls to the backend,
 * to avoid cluttering the action creators, as well
 * as to give API access to native js code.
 */

 /** This header must be attached to all authed-requests to the API */
const apiRequestHeaders = {authorization:`Bearer`+localStorage.getItem('token')}

 /** Posts login request to backend */
const requestLoginWith = credentials => { return axios.post("api/login", credentials) }

/** Basic get request to authenticate the current (if any) JWT */
const authToken = token => { return axios.get(`/api/authUserToken`,{ headers:apiRequestHeaders })}

export default {
    requestLoginWith,
    authToken
}