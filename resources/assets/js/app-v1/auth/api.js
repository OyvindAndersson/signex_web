/**
 * Define all valid API routes for this module
 * Capitalized constants are non-argument routes
 * Camelcase functions are argumented routes
 */

 const API_LOGIN = 'login'
 const API_LOGOUT = 'logout'
 const API_VERIFY_TOKEN = 'verifyCookie'

 /** Example lowercase function */
 const apiUsers = ({ ids, max }) => {
     return `users?max=${max}`
 }

 export default {
     API_LOGIN,
     API_LOGOUT,
     API_VERIFY_TOKEN
 }