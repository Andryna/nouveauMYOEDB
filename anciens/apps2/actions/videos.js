import axios from 'axios';

// Importez les types d'actions que vous utiliserez dans votre action Redux
import {
  GET_VIDEO_REQUEST,
  GET_VIDEO_SUCCESS,
  GET_VIDEO_FAILURE,
  URL_PROD
} from '../constants/myconst';

export const getVideo = (id) => {
    return (dispatch) => {
      dispatch({ type: GET_VIDEO_REQUEST });
      return axios
        // .post(URL_PROD + '/portail-stagiaire/old_listevideo.php', {
        .post(URL_PROD + '/portail-stagiaire/listvideo.php', {
          id: id,
        })
        .then((response) => {
          // alert(id);
          // alert('getvideo');
          console.log('video in get VIDEO REDUX',response.data);
          dispatch({ type: GET_VIDEO_SUCCESS, video: response.data});
        })
        .catch((error) => {
          dispatch({ type: GET_VIDEO_FAILURE, error });
        });
    };
  };
  