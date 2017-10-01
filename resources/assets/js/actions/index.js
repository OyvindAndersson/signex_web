import jwtdecode from 'jwt-decode';
import {AUTH_USER} from './types';
const ROOT_URL = 'http://localhost:3000';

export function loginUser({email,password}){
  return function(dispatch){
      axios.post(`/api/login`,{email,password})
        .then(response => {
          dispatch({type: AUTH_USER,
            payload:response.data.token             
          });
          localStorage.setItem('token',response.data.token);
        })

        .catch(()=>{
          dispatch(authError("Empty Required Field"));
        });
  }

}

