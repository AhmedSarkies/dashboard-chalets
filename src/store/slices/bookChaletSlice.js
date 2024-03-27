import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Http from "../../Http";

// Initial State
const initialState = {
  bookChalets: [],
  loading: false,
  error: null,
};

// Get Book Chalets using Axios and Redux Thunk
export const getBookChaletsApi = createAsyncThunk(
  "bookChalet/getBookChaletsApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Http({
        method: "GET",
        url: "/Bookshalihat/Get",
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

// Accept Book Chalet using Axios and Redux Thunk
export const acceptBookChaletApi = createAsyncThunk(
  "bookChalet/acceptBookChaletApi",
  async (id, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `/Bookshalihat/acceptBook`,
        params: { id },
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Reject Book Chalet using Axios and Redux Thunk
export const rejectBookChaletApi = createAsyncThunk(
  "bookChalet/rejectBookChaletApi",
  async (id, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `/Bookshalihat/rejectBook`,
        params: { id },
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Book Chalet using Axios and Redux Thunk
export const deleteBookChaletApi = createAsyncThunk(
  "bookChalet/deleteBookChaletApi",
  async (id, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `/Bookshalihat/Delete`,
        params: { id },
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Chalets Slice
const brokerSlice = createSlice({
  name: "bookChalet",
  initialState,
  reducers: {
    // Get Chalets
    getBookChalets: (state, action) => {
      state.brokers = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ======Get Chalets======
    // Pending
    builder.addCase(getBookChaletsApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(getBookChaletsApi.fulfilled, (state, action) => {
      state.bookChalets = action.payload;
      state.loading = false;
    });
    // Rejected
    builder.addCase(getBookChaletsApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Accept Chalet======
    // Pending
    builder.addCase(acceptBookChaletApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(acceptBookChaletApi.fulfilled, (state, action) => {
      state.loading = false;
    });
    // Rejected
    builder.addCase(acceptBookChaletApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Reject Chalet======
    // Pending
    builder.addCase(rejectBookChaletApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(rejectBookChaletApi.fulfilled, (state, action) => {
      state.loading = false;
    });
    // Rejected
    builder.addCase(rejectBookChaletApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Delete Chalet======
    // Pending
    builder.addCase(deleteBookChaletApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(deleteBookChaletApi.fulfilled, (state, action) => {
      state.loading = false;
    });
    // Rejected
    builder.addCase(deleteBookChaletApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { getBookChalets } = brokerSlice.actions;
export default brokerSlice.reducer;
