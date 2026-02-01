import axios from 'axios';

// Importez les types d'actions que vous utiliserez dans votre action Redux
import {
  GET_IMAGE_REQUEST,
  GET_IMAGE_SUCCESS,
  GET_IMAGE_FAILURE,
  URL_PROD
} from '../constants/myconst';


export const getImages = (id) => {
    return (dispatch) => {
      dispatch({ type: GET_IMAGE_REQUEST });
      return axios
        .post(URL_PROD + '/portail-stagiaire/images.php', {
          id: id,
        })
        .then((response) => {
          // console.log(response.data);
          dispatch({ type: GET_IMAGE_SUCCESS, image: response.data});
        })
        .catch((error) => {
          dispatch({ type: GET_IMAGE_FAILURE, error });
        });
    };
  };
  