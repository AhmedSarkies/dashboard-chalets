import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Http from "../../Http";

// Initial State
const initialState = {
  brokers: [],
  brokerChalets: [],
  loading: false,
  error: null,
};

// Get Brokers using Axios and Redux Thunk
export const getBrokersApi = createAsyncThunk(
  "broker/getBrokersApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Http({
        method: "GET",
        url: "/Broker/Get_Broker",
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
export const getBrokerChaletsApi = createAsyncThunk(
  "broker/getBrokerChaletsApi",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Http({
        method: "POST",
        url: "/Broker/Get_id",
        params: { id },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Broker using Axios and Redux Thunk
export const addBrokerApi = createAsyncThunk(
  "broker/addBrokerApi",
  async (data, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `/Broker/store_Broker`,
        data,
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Broker Chalet using Axios and Redux Thunk
export const addBrokerChaletApi = createAsyncThunk(
  "broker/addBrokerChaletApi",
  async (data, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `/Broker/storeBrokerChalet`,
        data,
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Broker using Axios and Redux Thunk
export const updateBrokerApi = createAsyncThunk(
  "broker/updateBrokerApi",
  async (data, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `/Broker/Update`,
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

// Delete Broker using Axios and Redux Thunk
export const deleteBrokerApi = createAsyncThunk(
  "broker/deleteBrokerApi",
  async (id, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `/Broker/Delete`,
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

// Brokers Slice
const brokerSlice = createSlice({
  name: "broker",
  initialState,
  reducers: {
    // Get Brokers
    getBrokers: (state, action) => {
      state.brokers = action.payload;
    },
    // Add Broker
    addBroker: (state, action) => {
      state.brokers.push(action.payload);
    },
    // Update Broker
    updateBroker: (state, action) => {
      state.brokers = state.brokers.map((broker) =>
        broker.id === action.payload.id ? action.payload : broker
      );
    },
    // Delete Broker
    deleteBroker: (state, action) => {
      state.brokers = state.brokers.filter(
        (broker) => broker.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // ======Get Chalets======
    // Pending
    builder.addCase(getBrokersApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(getBrokersApi.fulfilled, (state, action) => {
      state.brokers = action.payload;
      state.loading = false;
    });
    // Rejected
    builder.addCase(getBrokersApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Get Broker Chalets======
    // Pending
    builder.addCase(getBrokerChaletsApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(getBrokerChaletsApi.fulfilled, (state, action) => {
      state.brokerChalets = action.payload;
      state.loading = false;
    });
    // Rejected
    builder.addCase(getBrokerChaletsApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Add Broker======
    // Pending
    builder.addCase(addBrokerApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(addBrokerApi.fulfilled, (state, action) => {
      state.loading = false;
    });
    // Rejected
    builder.addCase(addBrokerApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Add Broker Chalet======
    // Pending
    builder.addCase(addBrokerChaletApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(addBrokerChaletApi.fulfilled, (state, action) => {
      state.loading = false;
      state.brokerChalets= action.payload;
    });
    // Rejected
    builder.addCase(addBrokerChaletApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Update Broker======
    // Pending
    builder.addCase(updateBrokerApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(updateBrokerApi.fulfilled, (state, action) => {
      state.loading = false;
    });
    // Rejected
    builder.addCase(updateBrokerApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Delete Broker======
    // Pending
    builder.addCase(deleteBrokerApi.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(deleteBrokerApi.fulfilled, (state, action) => {
      state.loading = false;
    });
    // Rejected
    builder.addCase(deleteBrokerApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { getBrokers, addBroker, updateBroker, deleteBroker } =
  brokerSlice.actions;
export default brokerSlice.reducer;
