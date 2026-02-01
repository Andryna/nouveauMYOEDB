import {
    GET_VIDEO_REQUEST,
    GET_VIDEO_SUCCESS,
    GET_VIDEO_FAILURE
  } from '../constants/myconst';
  
  const initialState = {
    video: [],
    isLoading: false,
    error: null,
  };
  
  
  const videoReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_VIDEO_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case GET_VIDEO_SUCCESS:
        return {
          ...state,
          video: action.video,
          isLoading: false,
          error: null,
        };
      case GET_VIDEO_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default videoReducer;
  