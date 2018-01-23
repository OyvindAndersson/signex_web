/*
|--------------------------------------------------------------------------
| Auth module api
|--------------------------------------------------------------------------
|
| Define all valid API endpoints for this module
| x Capitalized constants are non-argument routes
| x Camelcase functions are argumented routes
|
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