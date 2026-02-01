import axios from 'axios';
import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    URL_PREPROD,
    URL_PROD
} from '../constants/myconst';

  
  export const fetchData = (id) => {
    return (dispatch) => {
      dispatch({ type: FETCH_DATA_REQUEST });
  
      const requestData = {
        id: id
      };
      return axios.post(URL_PROD + '/portail-stagiaire/expression.php', requestData, {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      .then((response) => {
        dispatch({ type: FETCH_DATA_SUCCESS, data: response.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_DATA_FAILURE, error: error });
      });
    };
  };
  