import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const READ_URL = "https://insamideal.com/api/read/";
const POST_URL = "https://insamideal.com/api/upload/";
const DELETE_URL = "https://insamideal.com/api/delete/";

const initialState = {
  templates: [],
  status: "idle", // idle, loading, success, error
  error: null,
};

export const fetchTemplates = createAsyncThunk(
  "templates/fetchTemplates",
  async () => {
    try {
      const response = await axios.get(
        `${READ_URL}getAllReportTemplatesAndElementsByReportTemplate`
      );
      return [...response.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const postTemplate = createAsyncThunk(
  "templates/postTemplate",
  async (template) => {
    try {
      const { reportTemplateData, ...formElements } = template;
      const templateResponse = await axios.post(
        `${POST_URL}postReportTemplate`,
        reportTemplateData
      );
      const { report_template_id } = templateResponse.data;

      const elementsResponse = await axios.post(
        `${POST_URL}postReportTemplateElements`,
        {
          report_template_id: report_template_id,
          reportTemplateElementsData: formElements,
        }
      );
      const response = { ...templateResponse, ...elementsResponse };
      return [response.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteTemplate = createAsyncThunk(
  "templates/deleteTemplate",
  async (reportTemplateId) => {
    try {
      const response = await axios.delete(
        `${DELETE_URL}deleteReportTemplatesById/${reportTemplateId}`
      );
      return [...response.data];
    } catch (error) {
      return error.message;
    }
  }
);

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    templateAdded(state, action) {
      state.templates.push(action.payload);
    },
    setTemplatesStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.status = "success";
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(deleteTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteTemplate.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(postTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postTemplate.fulfilled, (state, action) => {
        state.status = "created";
      })
      .addCase(postTemplate.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const selectAllTemplates = (state) => state.templates.templates;

export const selectTemplatesStatus = (state) => state.templates.status;

export const { templateAdded, setTemplatesStatus } = templatesSlice.actions;

export default templatesSlice.reducer;
