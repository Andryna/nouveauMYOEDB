
export const toggleClickAudio = (clickaudio) => {
    return {
      type: 'TOGGLE_CLICK_AUDIO',
      clickaudio: clickaudio === 'Audios' ? '' : 'Audios'
    };
  };

export const toggleClickExp = (clickExp) => {
    return {
      type: 'TOGGLE_CLICK_EXP',
      clickExp: clickExp === 'Expressions' ? '' : 'Expressions'
    };
  };

export const toggleClickImage = (clickImage) => {
    return {
      type: 'TOGGLE_CLICK_IMG',
      clickImage: clickImage === 'Images' ? '' : 'Images'
    };
  };
  
export const toggleClickVideo = (clickVideo) => {
    return {
      type: 'TOGGLE_CLICK_VD',
      clickVideo: clickVideo === 'Videos' ? '' : 'Videos'
    };
  };

export  const toggleMenu = () => {
    return {
      type: 'TOGGLE_MENU'
    };
  };
export  const closeAll = () => {
    return {
      type: 'CLOSE_MENU'
    };
  };
  
  