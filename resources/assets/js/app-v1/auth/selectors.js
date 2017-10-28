/**
 * Useful state selectors for Auth
 */
var jwtDecode = require('jwt-decode')

/**
 * Checks for realtime authentication. If the token is manually deleted
 * / storage is cleared after a private-route page-load, isAuthenticated
 * is not updated until the route updates. Therefore, to check in 
 * realtime if the user still has access, we can check both the
 * isAuthenticated state AND the local storage token. If that
 * token does not exist, we know that the user cannot be authed on the 
 * next request (unless it is a login request) that validates it server side. 
 * NOTE: jwtDecode does NOT validate securely, it merely helps to determine 
 * if a token is well-formed.
 * @param {object} authState auth reducer state to derive state from
 */
 export const getRealtimeIsAuthenticated = authState => {
     try {
        return authState.isAuthenticated && jwtDecode(localStorage.getItem('token'))
     } catch(err) {
        return false
     }
 }
