import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Http from "../../Http";

// Initial State
const initialState = {
  chalets: [],
  loading: false,
  error: null,
};

// Get Chalets using Axios and Redux Thunk
export const getChaletsApi = createAsyncThunk(
  "chalet/getChaletsApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Http({
        method: "GET",
        url: "/Chalet/Get",
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

// Add Chalet using Axios and Redux Thunk
export const addChaletApi = createAsyncThunk(
  "chalet/addChaletApi",
  async (data, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `/Chalet/store`,
        data,
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Chalet using Axios and Redux Thunk
export const updateChaletApi = createAsyncThunk(
  "chalet/updateChaletApi",
  async (data, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `/Chalet/Update`,
        data,
        params: { id: data.id },
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Chalet using Axios and Redux Thunk
export const deleteChaletApi = createAsyncThunk(
  "chalet/deleteChaletApi",
  async (id, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `/Chalet/Delete`,
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

// Chalets Slice
const chaletSlice = createSlice({
  name: "chalet",
  initialState,
  reducers: {
    // Get Chalets
    getChalets: (state, action) => {
      state.chalets = action.payload;
    },
    // Add Chalet
    addChalet: (state, action) => {
      state.chalets.push(action.payload);
    },
    // Update Chalet
    updateChalet: (state, action) => {
      state.chalets = state.chalets.map((chalet) =>
        chalet.id === action.payload.id ? action.payload : chalet
      );
    },
    // Delete Chalet
    deleteChalet: (state, action) => {
      state.chalets = state.chalets.filter(
        (chalet) => chalet.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // ======Get Chalets======
    // Pending
    builder.addCase(getChaletsApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(getChaletsApi.fulfilled, (state, action) => {
      state.chalets = action.payload;
      state.loading = false;
    });
    // Rejected
    builder.addCase(getChaletsApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Add Chalet======
    // Pending
    builder.addCase(addChaletApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(addChaletApi.fulfilled, (state, action) => {
      state.loading = false;
    });
    // Rejected
    builder.addCase(addChaletApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Update Chalet======
    // Pending
    builder.addCase(updateChaletApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(updateChaletApi.fulfilled, (state, action) => {
      state.loading = false;
    });
    // Rejected
    builder.addCase(updateChaletApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Delete Chalet======
    // Pending
    builder.addCase(deleteChaletApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(deleteChaletApi.fulfilled, (state, action) => {
      state.loading = false;
    });
    // Rejected
    builder.addCase(deleteChaletApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { getChalets, addChalet, updateChalet, deleteChalet } =
  chaletSlice.actions;
export default chaletSlice.reducer;
