import axios from 'axios';
import {
  FETCH_NBEXP_REQUEST,
  FETCH_NBEXP_SUCCESS,
  FETCH_NBEXP_FAILURE,
  URL_PROD
} from '../constants/myconst';

export const getNbExp = (id, id_groupe) => {
  return (dispatch) => {
    dispatch({ type: FETCH_NBEXP_REQUEST });

    return axios.post(URL_PROD + '/portail-stagiaire/nbvideo.php', {
        id: id,
        id_groupe: id_groupe
    })
    .then((response) => {
      const nbExp = response.data;
      const nbaudio = nbExp.map(data => data.nbaudio);
      const nbtext = nbExp.map(data => data.nbtext);
      const nbvideo = nbExp.map(data => data.nbvideo);
      const nbcat = nbExp.map(data => data.nbcat);
      dispatch({
        type: FETCH_NBEXP_SUCCESS,
        nbExp: nbExp,
        nbaudio: nbaudio,
        nbtext: nbtext,
        nbvideo: nbvideo,
        nbcat: nbcat
      });
    })
    .catch((error) => {
      dispatch({ type: FETCH_NBEXP_FAILURE, error });
    });
  };
};
