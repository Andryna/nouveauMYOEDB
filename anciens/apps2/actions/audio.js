import axios from 'axios';
import {
    FETCH_AUDIO_REQUEST,
    FETCH_AUDIO_SUCCESS,
    FETCH_AUDIO_FAILURE,
    URL_PREPROD,
    URL_PROD
} from '../constants/myconst';


  export const fetchAudio = (id) => {
    return (dispatch) => {
      dispatch({ type: FETCH_AUDIO_REQUEST });
  
      const requestData = {
        id: id
      };
      return axios.post(URL_PROD + '/portail-stagiaire/audioList.php', requestData, {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      .then((response) => {
        dispatch({ type: FETCH_AUDIO_SUCCESS, audioData: response.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_AUDIO_FAILURE, error: error });
      });
    };
  };
  