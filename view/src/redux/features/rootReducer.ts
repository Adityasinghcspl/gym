import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import trainerSlice from './trainer/trainerSlice';
import userSlice from './user/userSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  trainer: trainerSlice,
  user: userSlice
});

export default rootReducer;