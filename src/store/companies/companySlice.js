import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const READ_URL = "https://insamideal.com/api/read/";

const initialState = {
  company: null,
  status: "idle", // idle, loading, success, error
  error: null,
};

export const fetchFirstCompany = createAsyncThunk(
  "company/fetchCompany",
  async () => {
    try {
      const response = await axios.get(`${READ_URL}getFirstCompany/`);
      return [response.data];
    } catch (error) {
      return error.message;
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFirstCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFirstCompany.fulfilled, (state, action) => {
        state.status = "success";
        state.company = action.payload[0];
      })
      .addCase(fetchFirstCompany.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const selectCompany = (state) => state.company.company;

export const selectCompanyStatus = (state) => state.company.status;

export default companySlice.reducer;
