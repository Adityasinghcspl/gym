import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RestClientBuilder } from "../../../utils/RestClient";
import { RESTServerRoute } from "../../../types/server";
import { trainerState } from "../../../types/slice";
import config from "../../../config/config";
import { trainer } from "../../../types/type";
import { logout } from "../auth/authSlice";

const initialState: trainerState = {
  trainersList: {
    data: null,
    loading: false,
    error: null
  },
  trainer: {
    data: null,
    loading: false,
    error: null
  }
};

// Define an async thunk for get all trainer
export const getAllTrainers = createAsyncThunk<trainer[], void>(
  'trainer/getAllTrainer',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      // Build the RestClient with the necessary configuration
      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader('Authorization', token) // Ensure Authorization header uses the "Bearer" token format
        .withParams({ Limit: 50 }) // Add any additional query parameters here
        .build()
        .get<trainer[]>(RESTServerRoute.REST_All_TRAINERS); // Expecting an array of trainers
      return data; // Return the data retrieved
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout()); // Call logout action
      }
      // Ensure error handling provides meaningful feedback
      const errorMessage = error?.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// Define an async thunk for get trainer
export const getTrainer = createAsyncThunk<trainer, string>(
  'trainer/getTrainer',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      // Build the RestClient with the necessary configuration
      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader('Authorization', token)
        .build()
        .get<trainer>(RESTServerRoute.REST_TRAINER(id));
      return data; // Return the data retrieved
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout()); // Call logout action
      }
      // Ensure error handling provides meaningful feedback
      const errorMessage = error?.response?.data?.message || 'An error occurred while getting the trainer.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Define an async thunk for delete trainer
export const deleteTrainer = createAsyncThunk<any, string>(
  'trainer/deleteTrainer',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      // Build the RestClient with the necessary configuration
      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader('Authorization', token) // Ensure Authorization header uses the "Bearer" token format
        .build()
        .delete<any>(RESTServerRoute.REST_DELETE_TRAINER(id)); // Expecting an array of trainers
      return data; // Return the data retrieved
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout()); // Call logout action
      }
      // Ensure error handling provides meaningful feedback
      const errorMessage = error?.response?.data?.message || 'An error occurred while deleting trainer.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Define an async thunk for update trainer
export const updateTrainer = createAsyncThunk<any, { id: string; trainerData: trainer }>(
  'trainer/updateTrainer',
  async ({ id, trainerData }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      // Build the RestClient with the necessary configuration
      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader('Authorization', token) // Ensure Authorization header uses the "Bearer" token format
        .build()
        .patch<any>(RESTServerRoute.REST_UPDATE_TRAINER(id), trainerData);
      return data; // Return the data retrieved
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout()); // Call logout action
      }
      // Ensure error handling provides meaningful feedback
      const errorMessage = error?.response?.data?.message || 'An error occurred while updating the trainer.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Define an async thunk for update trainer password using admin
export const updateTrainerPassword = createAsyncThunk<any, { id: string; newPassword: string }>(
  'trainer/updateTrainerPassword',
  async ({ id, newPassword }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      // Build the RestClient with the necessary configuration
      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader('Authorization', token) // Ensure Authorization header uses the "Bearer" token format
        .build()
        .patch<any>(RESTServerRoute.REST_UPDATE_PASSWORD_TRAINER(id), newPassword);
      return data; // Return the data retrieved
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout()); // Call logout action
      }
      // Ensure error handling provides meaningful feedback
      const errorMessage = error?.response?.data?.message || 'An error occurred while updating the trainer.';
      return rejectWithValue(errorMessage);
    }
  }
);


const trainerSlice = createSlice({
  name: "trainer",
  initialState,
  reducers: {
    clearTrainerError: (state) => {
      state.trainersList.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTrainers.pending, (state) => {
        state.trainersList.loading = true;
        state.trainersList.error = null;
      })
      .addCase(getAllTrainers.fulfilled, (state, action) => {
        state.trainersList.loading = false;
        state.trainersList.data = action.payload;
      })
      .addCase(getAllTrainers.rejected, (state, action) => {
        state.trainersList.loading = false;
        state.trainersList.error = action.payload as string;
      })
      .addCase(getTrainer.pending, (state) => {
        state.trainer.loading = true;
        state.trainer.error = null;
      })
      .addCase(getTrainer.fulfilled, (state, action) => {
        state.trainer.loading = false;
        state.trainer.data = action.payload;
      })
      .addCase(getTrainer.rejected, (state, action) => {
        state.trainer.loading = false;
        state.trainer.error = action.payload as string;
      })
  }
});

export const { clearTrainerError } = trainerSlice.actions;
export default trainerSlice.reducer;
