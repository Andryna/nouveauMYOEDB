import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
  URL_PROD
} from '../constants/myconst';



export const get_Token = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: GET_TOKEN_REQUEST });
    try {
      const response = await axios.post(URL_PROD + '/portail-stagiaire/auth.php', {
        login: login,
        password: password
      });
      // console.log(response.data);
      dispatch({ type: GET_TOKEN_SUCCESS, data_Token: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_TOKEN_FAILURE, error });
    }
  };
};

export const login = (username, password) => {
    // Vous pouvez effectuer une requête au serveur ici pour vérifier les informations de connexion.
    return {
      type: 'LOGIN',
      payload: { username, isLoggedIn: true },
    };
  };
  
  export const logout = () => ({
    type: 'LOGOUT',
  });

  export const setUserInfo = (userInfo) => {
    // console.log("SET_USER_INFO", userInfoS );
    // const userInfo = JSON.parse(userInfoS);

    return {
      type: 'SET_USER_INFO',
      userInfo,
    };
  };
  export const storeUser = (userData) => {
    return async (dispatch) => {
      try {
        // Utiliser AsyncStorage ici
        await AsyncStorage.setItem('user', JSON.stringify(userData));
  
        // Dispatch l'action
        dispatch({ type: 'USER_STORED', payload: userData });
        console.warn('utilisateur stocké');
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement des données utilisateur :', error);
      }
    };
  };

  export const getUser = () => {
    return async (dispatch) => {
      try {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
          const userData = JSON.parse(userString);
          dispatch({ type: 'SET_USER', payload: userData });
          console.log('DATA STORED: '+JSON.stringify(userData));
          console.warn('VERIFIER LE CONSOLE');
          return userData;
        } else {
          // Handle the case where there is no user data in AsyncStorage
          console.warn('No user data found in AsyncStorage');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      }
    };
  };
  
  export const removeUser = () => {
    return async (dispatch) => {
      try {
        // Supprimez les données utilisateur d'AsyncStorage
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('data_Token');
        console.warn('data clean');
        // Dispatchez une action pour indiquer que l'utilisateur a été supprimé
        dispatch({ type: 'REMOVE_USER' });
      } catch (error) {
        console.error('Erreur lors de la suppression des données utilisateur :', error);
      }
    };
  };