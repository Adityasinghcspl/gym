import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RestClientBuilder } from "../../../utils/RestClient";
import { RESTServerRoute } from "../../../types/server";
import { UserState } from "../../../types/slice";
import config from "../../../config/config";
import { AppointmentForm, AssignMemberShip, ContactFormInputs, User } from "../../../types/type";
import { logout } from "../auth/authSlice";

const initialState: UserState = {
  userList: {
    data: null,
    loading: false,
    error: null
  },
  user: {
    data: null,
    loading: false,
    error: null
  }
};

// Define an async thunk for get all user
export const getAllUsers = createAsyncThunk<User[], void>(
  'user/getAllUser',
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
        .get<User[]>(RESTServerRoute.REST_All_USERS); // Expecting an array of users
      return data; // Return the data retrieved
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout()); // Call logout action
      }
      // Ensure error handling provides meaningful feedback
      const errorMessage = error?.response?.data?.message || 'An error occurred while fetching users.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Define an async thunk for get user
export const getUser = createAsyncThunk<User, string>(
  'user/getUser',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      // Build the RestClient with the necessary configuration
      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader('Authorization', token)
        .build()
        .get<User>(RESTServerRoute.REST_USER(id));
      return data; // Return the data retrieved
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout()); // Call logout action
      }
      // Ensure error handling provides meaningful feedback
      const errorMessage = error?.response?.data?.message || 'An error occurred while getting the user.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Define an async thunk for delete user
export const deleteUser = createAsyncThunk<any, string>(
  'user/deleteUser',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      // Build the RestClient with the necessary configuration
      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader('Authorization', token) // Ensure Authorization header uses the "Bearer" token format
        .build()
        .delete<any>(RESTServerRoute.REST_DELETE_USER(id)); // Expecting an array of user
      return data; // Return the data retrieved
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout()); // Call logout action
      }
      // Ensure error handling provides meaningful feedback
      const errorMessage = error?.response?.data?.message || 'An error occurred while deleting user.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Define an async thunk for update user
export const updateUser = createAsyncThunk<any, { id: string; userData: User }>(
  'user/updateUser',
  async ({ id, userData }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      // Build the RestClient with the necessary configuration
      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader('Authorization', token) // Ensure Authorization header uses the "Bearer" token format
        .build()
        .patch<any>(RESTServerRoute.REST_UPDATE_USER(id), userData);
      return data; // Return the data retrieved
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout()); // Call logout action
      }
      // Ensure error handling provides meaningful feedback
      const errorMessage = error?.response?.data?.message || 'An error occurred while updating the user.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Define an async thunk for update user password using admin
export const updateUserPassword = createAsyncThunk<any, { id: string; newPassword: string }>(
  'user/updateUserPassword',
  async ({ id, newPassword }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      // Build the RestClient with the necessary configuration
      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader('Authorization', token) // Ensure Authorization header uses the "Bearer" token format
        .build()
        .patch<any>(RESTServerRoute.REST_UPDATE_PASSWORD_USER(id), newPassword);
      return data; // Return the data retrieved
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout()); // Call logout action
      }
      // Ensure error handling provides meaningful feedback
      const errorMessage = error?.response?.data?.message || 'An error occurred while updating the user.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Define an async thunk for update user
export const assignMemberShipToUser = createAsyncThunk<any, AssignMemberShip>(
  'user/assignMemberShipToUser',
  async (membershipData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      // Build the RestClient with the necessary configuration
      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader('Authorization', token) // Ensure Authorization header uses the "Bearer" token format
        .build()
        .patch<any>(RESTServerRoute.REST_ASSIGN_MEMBERSHIP_USER(membershipData.id), membershipData);
      return data; // Return the data retrieved
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout()); // Call logout action
      }
      // Ensure error handling provides meaningful feedback
      const errorMessage = error?.response?.data?.message || 'An error occurred while updating the user.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Define an async thunk for contact-us
export const contactUS = createAsyncThunk<any, ContactFormInputs>(
  'user/contact-us',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      // Build the RestClient with the necessary configuration
      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .build()
        .post<any>(RESTServerRoute.REST_CONTACTUS, formData);
      return data; // Return the data retrieved
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout()); // Call logout action
      }
      // Ensure error handling provides meaningful feedback
      const errorMessage = error?.response?.data?.message || 'An error occurred while sending the message.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Define an async thunk for book appointment
export const bookAppointment = createAsyncThunk<any, AppointmentForm>(
  'user/book-appointment',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      // Build the RestClient with the necessary configuration
      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .build()
        .post<any>(RESTServerRoute.REST_BOOK_APPOINTMENT, formData);
      return data; // Return the data retrieved
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout()); // Call logout action
      }
      // Ensure error handling provides meaningful feedback
      const errorMessage = error?.response?.data?.message || 'An error occurred while sending the message.';
      return rejectWithValue(errorMessage);
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.userList.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.userList.loading = true;
        state.userList.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.userList.loading = false;
        state.userList.data = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.userList.loading = false;
        state.userList.error = action.payload as string;
      })
      .addCase(getUser.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload as string;
      })
  }
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;