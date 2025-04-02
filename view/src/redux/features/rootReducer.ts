import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import trainerSlice from './auth/trainerSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  trainer: trainerSlice
});

export default rootReducer;