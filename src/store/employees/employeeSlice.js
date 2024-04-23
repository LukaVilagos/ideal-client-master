import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const READ_URL = "https://insamideal.com/api/read/";

const initialState = {
  employee: null,
  status: "idle", // idle, loading, success, error
  error: null,
};

export const fetchEmployee = createAsyncThunk(
  "employees/fetchTemplate",
  async ({ user_id, company_id }) => {
    try {
      const response = await axios.get(
        `${READ_URL}getEmployeeByUserAndCompany/${user_id}/${company_id}`
      );
      return [response.data];
    } catch (error) {
      return error.message;
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.status = "success";
        state.employee = action.payload[0];
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const selectEmployee = (state) => state.employee.employee;

export const selectEmployeeStatus = (state) => state.employee.status;

export default employeeSlice.reducer;
