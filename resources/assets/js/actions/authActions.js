import { 
    AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_REJECTED, 
    FETCH_AUTH_USER, FETCH_AUTH_USER_SUCCESS, FETCH_AUTH_USER_REJECTED,
    FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_REJECTED,
    LOGOUT_USER 
} from './types';

export function authUserToken(token){
    return dispatch => { 
        axios.get(`/api/authUserToken`,{
      headers:{authorization:`Bearer`+localStorage.getItem('token')}
        })
            .then(response =>{
                dispatch({ type:AUTH_USER, payload:response.data })
            })
            .catch((err) => {
                dispatch({ type:AUTH_USER_REJECTED, payload:err })
            })
    }
}

export function fetchAuthUser(){
    return dispatch => { 
        axios.get(`/api/fetchAuthUser`,{
      headers:{authorization:`Bearer`+localStorage.getItem('token')}
        })
            .then(response =>{
                dispatch({ type:FETCH_AUTH_USER_SUCCESS, payload:response.data })
            })
            .catch((err) => {
                dispatch({ type:FETCH_AUTH_USER_REJECTED, payload:err })
            })
    }
}

export function fetchUser(){
    return function(dispatch) {
        axios.get("api/user")
            .then((response) => {
                dispatch({ type: FETCH_USER_SUCCESS, payload: response.data[0] });
            })
            .catch((err) => {
                dispatch({ type: FETCH_USER_REJECTED, payload: err });
            })
    }
}

export function loginUser(username, password){
    return function(dispatch){
        axios.post("api/login", { email: username, password: password })
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            dispatch({ type: AUTH_USER_SUCCESS, payload: response.data });
        })
        .catch((err) => {
            dispatch({ type: AUTH_USER_REJECTED, payload: err });
        })
    }
}

export function logoutUser() {
    localStorage.removeItem('token');
    return { type: LOGOUT_USER };
  }