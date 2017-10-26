/**
 * The API file takes care of all calls to the backend,
 * to avoid cluttering the action creators, as well
 * as to give API access to native js code.
 */
import axios from 'axios'
import {apiRequestHeaders} from '../common/api'

 /** Posts login request to backend */
const requestLoginWith = credentials => { return axios.post("api/login", credentials) }

/** Basic get request to authenticate the current (if any) JWT */
const authToken = token => { return axios.get(`/api/authUserToken`,{ headers:apiRequestHeaders() })}

const authFetchUsers = id => {return axios.get(`/api/users/${id}`, {headers:apiRequestHeaders()})}

export default {
    requestLoginWith,
    authToken,
    authFetchUsers
}