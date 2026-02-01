import {
    FETCH_CAT_REQUEST,
    FETCH_CAT_SUCCESS,
    FETCH_CAT_FAILURE
} from '../constants/myconst';

  const initialState = {
    category: null,
    isLoading: false,
    error: null
  };

  const catReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CAT_REQUEST:
        return { ...state, isLoading: true, error: null };
      case FETCH_CAT_SUCCESS:
        return { ...state, isLoading: false, category: action.category, error: null };
      case FETCH_CAT_FAILURE:
        return { ...state, isLoading: false, category: [], error: action.error };
      default:
        return state;
    }
  };
  
  export default catReducer;
  
  