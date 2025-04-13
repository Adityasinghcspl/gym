import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AccessToken, SignInTrainerForm, SignUpUserForm } from "../../../types/type";
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
  signUpUser: {
    data: null,
    loading: false,
    error: null
  },
  signInUser: {
    data: null,
    loading: false,
    error: null
  }
};

// Define an async thunk for sign-in trainer action
export const signInTrainer = createAsyncThunk<AccessToken, SignInTrainerForm>(
  'trainer/login',
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
      return rejectWithValue(error?.response?.data?.message || "Login failed");
    }
  }
);

// Define an async thunk for sign-up trainer action
export const signUpTrainer = createAsyncThunk<{ message: string }, SignUpUserForm>(
  'trainer/register',
  async (signUpData, { rejectWithValue }) => {
    try {
      const response = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .build()
        .post<{ message: string }>(RESTServerRoute.REST_SIGNUP_TRAINER, signUpData);
      return response; // Return only necessary data
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "SignUp failed");
    }
  }
);

// Define an async thunk for trainer Send Reset Password Link action
export const trainerSendResetPasswordLink = createAsyncThunk<{ message: string }, string>(
  'trainer/sendResetPasswordLink',
  async (email, { rejectWithValue }) => {
    try {
      const response = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .build()
        .post<{ message: string }>(RESTServerRoute.REST_SEND_RESET_PASSWORD_LINK_TRAINER, {email: email});
      return response; // Return only necessary data
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Define an async thunk for trainer Reset Password action
export const trainerResetPassword = createAsyncThunk<{ message: string }, { id: string, token: string, password: string }>(
  'trainer/resetPassword',
  async ({ id, token, password }, { rejectWithValue }) => {
    try {
      const response = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .build()
        .post<{ message: string }>(RESTServerRoute.REST_RESET_PASSWORD_TRAINER(id, token), {password: password});
      return response; // Return only necessary data
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Define an async thunk for user Send Reset Password Link action
export const userSendResetPasswordLink = createAsyncThunk<{ message: string }, string>(
  'user/sendResetPasswordLink',
  async (email, { rejectWithValue }) => {
    try {
      const response = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .build()
        .post<{ message: string }>(RESTServerRoute.REST_SEND_RESET_PASSWORD_LINK_USER, email);
      return response; // Return only necessary data
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
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
      })
      // Handle signUpTrainer request
      .addCase(signUpTrainer.pending, (state) => {
        state.signUpTrainer.loading = true;
        state.signUpTrainer.error = null;
        state.signUpTrainer.data = null;
      })
      .addCase(signUpTrainer.fulfilled, (state, action) => {
        state.signUpTrainer.loading = false;
        state.signUpTrainer.data = action.payload.message; // Set success message
      })
      .addCase(signUpTrainer.rejected, (state, action) => {
        state.signUpTrainer.loading = false;
        state.signUpTrainer.error = action.payload as string; // Set error message
      });
  }
});

export const { clearAuthError, logout } = authSlice.actions;
export default authSlice.reducer;
