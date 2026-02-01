// reducers/audioReducer.js

const initialState = {
    clickaudio: '',
    clickVideo:'',
    clickExp:'',
    clickImage:'',
    menu:false
  };
  
  const animateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_CLICK_AUDIO':
          return {
            ...state,
            clickaudio: action.clickaudio, // Utilisez la valeur fournie par l'action.
            clickExp:'',
            clickVideo:'',
            clickImage:''
          };
        case 'TOGGLE_CLICK_EXP':
          return {
            ...state,
            clickExp: action.clickExp, // Utilisez la valeur fournie par l'action.
            clickImage:'',
            clickVideo:'',
            clickaudio:''
          };
        case 'TOGGLE_CLICK_IMG':
          return {
            ...state,
            clickImage: action.clickImage, // Utilisez la valeur fournie par l'action.
            clickExp:'',
            clickVideo:'',
            clickaudio:''
          };
        case 'TOGGLE_CLICK_VD':
          return {
            ...state,
            clickVideo: action.clickVideo, // Utilisez la valeur fournie par l'action.
            clickExp:'',
            clickImage:'',
            clickaudio:''
          };
        case 'TOGGLE_MENU':
          return { ...state, menu: false };
        case 'CLOSE_MENU':
          return initialState;
        // Gérez d'autres actions si nécessaire.
        default:
          return state;
      }
    };
  
  export default animateReducer;
  