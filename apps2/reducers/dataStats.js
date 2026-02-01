import {
    FETCH_NBEXP_REQUEST,
    FETCH_NBEXP_SUCCESS,
    FETCH_NBEXP_FAILURE
  } from '../constants/myconst';
  
  const initialState = {
    nbExp: [],
    nbaudio: 0,
    nbtext: 0,
    nbvideo: 0,
    nbcat: 0,
    isLoading: false,
    error: null
  };
  
  const nbExpReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_NBEXP_REQUEST:
        return { ...state, isLoading: true, error: null };
  
      case FETCH_NBEXP_SUCCESS:
        return {
          ...state,
          isLoading: false,
          nbExp: action.nbExp,
          nbaudio: action.nbaudio,
          nbtext: action.nbtext,
          nbvideo: action.nbvideo,
          nbcat: action.nbcat,
          error: null
        };
  
      case FETCH_NBEXP_FAILURE:
        return { ...state, isLoading: false, error: action.error };
  
      default:
        return state;
    }
  };
  
  export default nbExpReducer;
  