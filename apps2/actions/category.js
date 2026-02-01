import axios from 'axios';
import {
    FETCH_CAT_REQUEST,
    FETCH_CAT_SUCCESS,
    FETCH_CAT_FAILURE,
    URL_PROD
} from '../constants/myconst';

  const initialState = {
    category: null,
    isLoading: false,
    error: null
  };

  export const getCat = (id_groupe) => {
    return (dispatch) => {
      dispatch({ type: FETCH_CAT_REQUEST });
  
      return axios.post(URL_PROD + '/portail-stagiaire/picke_category.php', {
        id_groupe: id_groupe
      })
      .then((response) => {
        const cat = response.data;
        // console.log("CAT CAT CAT",cat);
        dispatch({ type: FETCH_CAT_SUCCESS, category:cat });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CAT_FAILURE, error });
      });
    };
  };