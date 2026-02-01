
const initialState = {
    langMyoedb: 'en', // Utilisez langMyoedb ici
  };
  
  function trandReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_LANG_MYOEDB': // Nouveau type d'action
        return {
          ...state,
          langMyoedb: action.payload, // Mettez à jour langMyoedb avec la valeur de payload
        };
      default:
        return state;
    }
  }
  
  export default trandReducer;
  