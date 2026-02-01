import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE
} from '../constants/myconst';

  const initialState = {
    data: null,
    isLoading: false,
    error: null
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATA_REQUEST:
        return { ...state, isLoading: true, error: null };
      case FETCH_DATA_SUCCESS:
        return { ...state, isLoading: false, data: action.data, error: null };
      case FETCH_DATA_FAILURE:
        return { ...state, isLoading: false, data: null, error: action.error };
      default:
        return state;
    }
  };
  
  export default dataReducer;
  