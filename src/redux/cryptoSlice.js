import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async () => {
    const response = await axios.get(
      'https://api.coincap.io/v2/assets?limit=10',
    );
    return response.data;
  },
);

export const fetchCryptoDetails = createAsyncThunk(
  'crypto/fetchCryptoDetails',
  async (assetId) => {
    const response = await axios.get(
      `https://api.coincap.io/v2/assets/${assetId}`,
    );
    return response.data;
  },
);

const initialState = {
  cryptoData: [],
  selectedDetails: null,
  status: 'idle',
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = 'Loading';
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.status = 'Succeeded';
        state.cryptoData = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.status = 'Failed';
        state.error = action.error.message;
      })
      .addCase(fetchCryptoDetails.fulfilled, (state, action) => {
        state.selectedDetails = action.payload.data;
      });
  },
});

export default cryptoSlice.reducer;
