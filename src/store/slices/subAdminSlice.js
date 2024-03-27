import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Http from "../../Http";

// Initial State
const initialState = {
  subAdmins: [],
  loading: false,
  error: null,
};

// Get SubAdmins using Axios and Redux Thunk
export const getSubAdmins = createAsyncThunk(
  "subAdmin/getSubAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Http({
        method: "GET",
        url: "/Admin/Get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add SubAdmin using Axios and Redux Thunk
export const addSubAdmin = createAsyncThunk(
  "SubAdmin/addSubAdmin",
  async (data, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `AuthAdmin/register`,
        data,
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete SubAdmin using Axios and Redux Thunk
export const deleteSubAdmin = createAsyncThunk(
  "subAdmin/deleteSubAdmin",
  async (id, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `/SubAdmin/Delete`,
        params: { id },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// SubAdmins Slice
const subAdminSlice = createSlice({
  name: "subAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ======Get SubAdmin======
    // Pending
    builder.addCase(getSubAdmins.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(getSubAdmins.fulfilled, (state, action) => {
      state.subAdmins = action.payload.data;
      state.loading = false;
    });
    // Rejected
    builder.addCase(getSubAdmins.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Add SubAdmin======
    // Pending
    builder.addCase(addSubAdmin.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(addSubAdmin.fulfilled, (state, action) => {
      state.loading = false;
    });
    // Rejected
    builder.addCase(addSubAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Delete SubAdmin======
    // Pending
    builder.addCase(deleteSubAdmin.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(deleteSubAdmin.fulfilled, (state, action) => {
      state.loading = false;
    });
    // Rejected
    builder.addCase(deleteSubAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default subAdminSlice.reducer;
