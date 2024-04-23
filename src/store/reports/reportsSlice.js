import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const READ_URL = "https://insamideal.com/api/read/";
const POST_URL = "https://insamideal.com/api/upload/";
const DELETE_URL = "https://insamideal.com/api/delete/";

const initialState = {
  reports: [],
  status: "idle", // idle, loading, success, error
  error: null,
};

export const fetchReports = createAsyncThunk(
  "reports/fetchReports",
  async () => {
    try {
      const response = await axios.get(`${READ_URL}getAllRelatedToReports`);
      return [...response.data.reports];
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchReportsByReportTemplate = createAsyncThunk(
  "reports/fetchReportsByReportTemplate",
  async (report_template_id) => {
    try {
      const response = await axios.get(
        `${READ_URL}getAllRelatedToReportsByReportTemplate/${report_template_id}`
      );
      return [...response.data];
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

export const addNewReport = createAsyncThunk(
  "reports/addNewReport",
  async (report) => {
    try {
      const { elements, ...reportData } = report;

      const reportResponse = await axios.post(
        `${POST_URL}postReport`,
        reportData
      );

      const { report_id } = reportResponse.data;

      const elementsResponse = await axios.post(
        `${POST_URL}postReportElements`,
        {
          report_id: report_id,
          reportElementsData: elements,
        }
      );

      const response = { ...reportResponse, ...elementsResponse };

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    reportAdded: {
      reducer(state, action) {
        state.reports.push(action.payload);
      },
      prepare(
        id,
        template,
        company_id,
        createdAt,
        last_edited,
        name,
        creator,
        elements
      ) {
        return {
          payload: {
            id,
            template,
            company_id,
            createdAt,
            last_edited,
            name,
            creator,
            elements,
          },
        };
      },
    },
    setReports: {
      reducer(state, action) {
        state.reports = action.payload;
      },
    },
    setReportsStatus: {
      reducer(state, action) {
        state.status = action.payload;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = "success";
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchReportsByReportTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReportsByReportTemplate.fulfilled, (state, action) => {
        state.status = "success";
        state.reports = action.payload;
      })
      .addCase(fetchReportsByReportTemplate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteReport.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addNewReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewReport.fulfilled, (state) => {
        state.status = "created";
      })
      .addCase(addNewReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllReports = (state) => state.reports.reports;

export const selectReportsStatus = (state) => state.reports.status;

export const { reportAdded, setReports, setReportsStatus } =
  reportsSlice.actions;

export default reportsSlice.reducer;
