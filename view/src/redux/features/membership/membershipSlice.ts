import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RestClientBuilder } from "../../../utils/RestClient";
import { RESTServerRoute } from "../../../types/server";
import { MembershipState } from "../../../types/slice";
import config from "../../../config/config";
import { Membership } from "../../../types/type";
import { logout } from "../auth/authSlice";

const initialState: MembershipState = {
  membershipsList: {
    data: null,
    loading: false,
    error: null,
  },
  membership: {
    data: null,
    loading: false,
    error: null,
  },
};

// Get all memberships
export const getAllMemberships = createAsyncThunk<Membership[], void>(
  "membership/getAllMemberships",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .build()
        .get<Membership[]>(RESTServerRoute.REST_All_MEMBERSHIPS);

      return data;
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout());
      }
      const errorMessage = error?.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// Create a membership
export const createMembership = createAsyncThunk<any, Membership>(
  "membership/createMembership",
  async (membershipData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader("Authorization", token)
        .build()
        .post<any>(RESTServerRoute.REST_CREATE_MEMBERSHIP, membershipData);

      return data;
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout());
      }
      const errorMessage = error?.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete a membership
export const deleteMembership = createAsyncThunk<any, string>(
  "membership/deleteMembership",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader("Authorization", token)
        .build()
        .delete<any>(RESTServerRoute.REST_DELETE_MEMBERSHIP(id));

      return data;
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout());
      }
      const errorMessage = error?.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// Update a membership
export const updateMembership = createAsyncThunk<any, { id: string; membershipData: Membership }>(
  "membership/updateMembership",
  async ({ id, membershipData }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const data = await RestClientBuilder.instance()
        .withBaseUrl(config.API_REST_ENDPOINT)
        .withHeader("Authorization", token)
        .build()
        .put<any>(RESTServerRoute.REST_UPDATE_MEMBERSHIP(id), membershipData);

      return data;
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(logout());
      }
      const errorMessage = error?.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
    clearMembershipError: (state) => {
      state.membershipsList.error = null;
      state.membership.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMemberships.pending, (state) => {
        state.membershipsList.loading = true;
        state.membershipsList.error = null;
      })
      .addCase(getAllMemberships.fulfilled, (state, action) => {
        state.membershipsList.loading = false;
        state.membershipsList.data = action.payload;
      })
      .addCase(getAllMemberships.rejected, (state, action) => {
        state.membershipsList.loading = false;
        state.membershipsList.error = action.payload as string;
      });
  },
});

export const { clearMembershipError } = membershipSlice.actions;
export default membershipSlice.reducer;
