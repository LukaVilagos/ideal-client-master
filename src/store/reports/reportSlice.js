import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const READ_URL = "http://localhost:10001/read/";
const DELETE_URL = "http://localhost:10001/delete/";
const UPDATE_URL = "http://localhost:10001/update/";

const initialState = {
  report: null,
  status: "idle", // idle, loading, success, error
  error: null,
};

export const fetchReport = createAsyncThunk(
  "reports/fetchReport",
  async (report_id) => {
    try {
      const response = await axios.get(
        `${READ_URL}getRelatedToReportsByReportId/${report_id}`
      );
      return [response.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteReport = createAsyncThunk(
  "reports/deleteReport",
  async (report_id) => {
    try {
      const response = await axios.delete(
        `${DELETE_URL}deleteReportById/${report_id}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const editReport = createAsyncThunk(
  "reports/editReport",
  async (report) => {
    try {
      const { report_id, ...reportData } = report;
      const reportResponse = await axios.put(`${UPDATE_URL}updateReportById`, {
        reportId: report_id,
        report: reportData,
      });

      return reportResponse.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const editReportElement = createAsyncThunk(
  "reports/editReportElement",
  async (report_element) => {
    try {
      const reportElementId = report_element.report_element_id;
      const response = await axios.put(`${UPDATE_URL}updateReportElementById`, {
        reportElementId: reportElementId,
        reportElement: report_element,
      });
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReport(state, action) {
      state.report = action.payload;
    },
    setReportStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.status = "success";
        state.report = action.payload[0];
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(deleteReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteReport.fulfilled, (state) => {
        state.status = "deleted";
        state.report = null;
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(editReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editReport.fulfilled, (state) => {
        state.status = "edited";
      })
      .addCase(editReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectReport = (state) => state.report.report;

export const selectReportStatus = (state) => state.report.status;

export const { setReport, setReportStatus } = reportSlice.actions;

export default reportSlice.reducer;
