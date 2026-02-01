import {
    GET_IMAGE_REQUEST,
    GET_IMAGE_SUCCESS,
    GET_IMAGE_FAILURE
  } from '../constants/myconst';
  
  const initialState = {
    imageList: [],
    isLoading: false,
    error: null,
  };
  
  
  const imageReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_IMAGE_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case GET_IMAGE_SUCCESS:
        return {
          ...state,
          imageList: action.image,
          isLoading: false,
          error: null,
        };
      case GET_IMAGE_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default imageReducer;
  