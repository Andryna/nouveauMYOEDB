import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import authReducer from '../reducers/user'; 
import dataReducer from '../reducers/expressions'; 
import catReducer from '../reducers/category';
import nbExpReducer from '../reducers/dataStats';
import videoReducer from '../reducers/videos';
import animateReducer from '../reducers/utils';
import audioReducer from '../reducers/audio';
import imageReducer from '../reducers/images';
import trandReducer from '../reducers/trandReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    data_All: dataReducer,
    categ: catReducer,
    dataStats: nbExpReducer,
    videoData: videoReducer,
    animate: animateReducer,
    data_Audio: audioReducer,
    data_Image: imageReducer,
    trand: trandReducer,
  }
});

export default store;
