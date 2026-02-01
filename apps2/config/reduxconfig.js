// reduxConfig.js
import { connect } from 'react-redux';
import { toggleClickAudio,toggleClickImage,toggleClickExp,toggleClickVideo, toggleMenu,closeAll } from '../actions/utils'; // Importez vos actions appropriées
import { getVideo } from '../actions/videos';
import { fetchAudio } from '../actions/audio';
import { fetchData } from '../actions/expressions';
import { getImages } from '../actions/images';
const mapStateToProps = (state) => ({
  // Vos définitions mapStateToProps ici
  userInfo: state.auth.userInfo,
  data: state.data_All.data,
  category: state.categ.category,
  nbExp: state.dataStats.nbExp,
  nbaudio: state.dataStats.nbaudio,
  nbtext: state.dataStats.nbtext,
  nbvideo: state.dataStats.nbvideo,
  nbcat: state.dataStats.nbcat,
  video: state.videoData.video,
  clickaudio : state.animate.clickaudio,
  clickVideo : state.animate.clickVideo,
  clickExp : state.animate.clickExp,
  clickImage : state.animate.clickImage,
  menu: state.animate.menu,
  audioData : state.data_Audio.audioData,
  imageList : state.data_Image.imageList,
  langMyoedb: state.trand.langMyoedb
});

const mapDispatchToProps = {
  toggleClickAudio,
  toggleClickExp,
  toggleClickVideo,
  toggleClickImage,
  toggleMenu,
  closeAll,
  getVideo,
  fetchAudio,
  fetchData,
  getImages
};

export const connectToRedux = connect(mapStateToProps, mapDispatchToProps);
