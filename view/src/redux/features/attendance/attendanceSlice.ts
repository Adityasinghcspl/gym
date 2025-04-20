import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RestClientBuilder } from "../../../utils/RestClient";
import { RESTServerRoute } from "../../../types/server";
import { Attendance, AttendanceState } from "../../../types/type";
import config from "../../../config/config";
import { logout } from "../auth/authSlice";

const initialState: AttendanceState = {
  attendanceList: {
    data: null,
    loading: false,
    error: null,
  },
  attendance: {
    data: null,
    loading: false,
    error: null,
  },
};

// Get all attendance records
export const getAllAttendance = createAsyncThunk<Attendance[], void>(
  "attendance/getAll",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader("Authorization", token)
        .build()
        .get<Attendance[]>(RESTServerRoute.REST_ALL_ATTENDANCE);

      return data;
    } catch (error: any) {
      if (error.status === 401) dispatch(logout());
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// Mark check-in (create attendance)
export const createAttendance = createAsyncThunk<any, Partial<Attendance>>(
  "attendance/create",
  async (attendanceData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader("Authorization", token)
        .build()
        .post<any>(RESTServerRoute.REST_CREATE_ATTENDANCE, attendanceData);

      return data;
    } catch (error: any) {
      if (error.status === 401) dispatch(logout());
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// Mark check-out (update attendance)
export const updateAttendance = createAsyncThunk<any, { userId: string; checkOut: string }>(
  "attendance/update",
  async ({ userId, checkOut }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader("Authorization", token)
        .build()
        .put<any>(RESTServerRoute.REST_UPDATE_ATTENDANCE, { userId, checkOut });

      return data;
    } catch (error: any) {
      if (error.status === 401) dispatch(logout());
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// Delete attendance
export const deleteAttendance = createAsyncThunk<any, string>(
  "attendance/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader("Authorization", token)
        .build()
        .delete<any>(RESTServerRoute.REST_DELETE_ATTENDANCE(id));

      return data;
    } catch (error: any) {
      if (error.status === 401) dispatch(logout());
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clearAttendanceError: (state) => {
      state.attendance.error = null;
      state.attendanceList.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAttendance.pending, (state) => {
        state.attendanceList.loading = true;
        state.attendanceList.error = null;
      })
      .addCase(getAllAttendance.fulfilled, (state, action) => {
        state.attendanceList.loading = false;
        state.attendanceList.data = action.payload;
      })
      .addCase(getAllAttendance.rejected, (state, action) => {
        state.attendanceList.loading = false;
        state.attendanceList.error = action.payload as string;
      });
  },
});

export const { clearAttendanceError } = attendanceSlice.actions;
export default attendanceSlice.reducer;
