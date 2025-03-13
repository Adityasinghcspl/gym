import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AccessToken, SignInTrainerForm } from "../../../types/type";
import { RestClientBuilder } from "../../../utils/RestClient";
import { RESTServerRoute } from "../../../types/server";
import { authState } from "../../../types/slice";
import config from "../../../config/config";

const initialState: authState = {
  signUpTrainer: {
    data: null,
    loading: false,
    error: null
  },
  signInTrainer: {
    data: null,
    loading: false,
    error: null
  },
  signUpUser:{
    data: null,
    loading: false,
    error: null
  },
  signInUser:{
    data: null,
    loading: false,
    error: null
  }
};


// Define an async thunk for sign-in action
export const signInTrainer = createAsyncThunk<AccessToken, SignInTrainerForm>(
  'api/trainer/register',
  async (signInData, { rejectWithValue }) => {
    try {
      const response = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .build()
        .post<AccessToken>(RESTServerRoute.REST_SIGNIN_TRAINER, signInData);

      if (!response || !response.accessToken) {
        return rejectWithValue("Invalid response from server");
      }

      return response; // Return only necessary data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);


const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.signInTrainer.error = null;
      state.signUpTrainer.error = null;
      state.signInUser.error = null;
      state.signUpUser.error = null;
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.signInTrainer.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInTrainer.pending, (state) => {
        state.signInTrainer.loading = true;
        state.signInTrainer.error = null;
      })
      .addCase(signInTrainer.fulfilled, (state, action) => {
        state.signInTrainer.loading = false;
        state.signInTrainer.data = action.payload;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(signInTrainer.rejected, (state, action) => {
        state.signInTrainer.loading = false;
        state.signInTrainer.error = action.payload as string;
      });
  }
});

export const { clearAuthError, logout } = authSlice.actions;
export default authSlice.reducer;
