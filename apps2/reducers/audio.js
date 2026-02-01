import {
    FETCH_AUDIO_REQUEST,
    FETCH_AUDIO_SUCCESS,
    FETCH_AUDIO_FAILURE,
    URL_PREPROD,
    URL_PROD
} from '../constants/myconst';

  const initialState = {
    audioData: null,
    isLoading: false,
    error: null
  };
  
  const audioReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_AUDIO_REQUEST:
        return { ...state, isLoading: true, error: null };
      case FETCH_AUDIO_SUCCESS:
        return { ...state, isLoading: false, audioData: action.audioData, error: null };
      case FETCH_AUDIO_FAILURE:
        return { ...state, isLoading: false, audioData: null, error: action.error };
      default:
        return state;
    }
  };
  
  export default audioReducer;
  