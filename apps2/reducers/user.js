// reducers.js
import {
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
  URL_PROD
} from '../constants/myconst';



const initialState = {
    isLoggedIn: false,
    username: null,
    userInfo: null,
    user:null,
    data_Token: null,
    isLoading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, isLoggedIn: action.payload.isLoggedIn, username: action.payload.username };
      case 'LOGOUT':
        return { ...state, isLoggedIn: false, username: null, userInfo: null };
      // case 'SET_USER_INFO':
      //   return { ...state, userInfo: action.payload };
      case 'SET_USER_INFO':
        // Gérer l'action de mise à jour de userInfo
        return {
          ...state,
          userInfo: action.userInfo,
        };
      case 'USER_STORED':
        return {
          ...state,
          user: action.payload,
        };
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
        };
      case 'REMOVE_USER':
        return {
          ...state,
          user: null, // Réinitialisez l'utilisateur à null après la suppression
          data_Token:null,
          isLoggedIn:false
        };
      case GET_TOKEN_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case GET_TOKEN_SUCCESS:
        return {
          ...state,
          data_Token: action.data_Token,
          isLoggedIn: true,
          isLoading: false,
          error: null,
        };
      case GET_TOKEN_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  