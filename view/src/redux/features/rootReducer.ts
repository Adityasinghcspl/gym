import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import trainerSlice from './trainer/trainerSlice';
import userSlice from './user/userSlice';
import membershipSlice from './membership/membershipSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  trainer: trainerSlice,
  user: userSlice,
  membership: membershipSlice
});

export default rootReducer;