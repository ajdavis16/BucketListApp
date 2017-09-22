import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR 
 } from './types';

import authReducer from '../reducers/auth_reducer';


export const CREATE_POSTS = 'CREATE_POSTS';
//const ROOT_URL = 'http://rest.learncode.academy/api/paul';
const ROOT_URL = 'http://localhost:3000';


export function signinUser({ email, password }){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response => {
    
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/newitem');
        
         })
          .catch(response =>  dispatch(authError("There was a something wrong with your request.")));
  }
}

export function signoutUser(){
   localStorage.removeItem('token'); 
   return {type: UNAUTH_USER};
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}


export function createPost(props) {
  const request = axios.post(`${ROOT_URL}/posts`, props);           
  return {
    type: CREATE_POSTS,
    payload: request
  };
}