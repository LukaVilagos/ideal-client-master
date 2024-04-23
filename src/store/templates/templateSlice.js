import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const READ_URL = "https://insamideal.com/api/read/";
const POST_URL = "https://insamideal.com/api/upload/";
const DELETE_URL = "https://insamideal.com/api/delete/";
const UPDATE_URL = "https://insamideal.com/api/update/";

const initialState = {
  template: null,
  status: "idle", // idle, loading, success, error
  error: null,
};

export const fetchTemplate = createAsyncThunk(
  "templates/fetchTemplate",
  async (template_id) => {
    try {
      const response = await axios.get(
        `${READ_URL}getReportTemplatesAndElementsByReportTemplate/${template_id}`
      );
      return [response.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteTemplate = createAsyncThunk(
  "templates/deleteTemplate",
  async (template_id) => {
    try {
      const response = await axios.delete(
        `${DELETE_URL}deleteReportTemplatesById/${template_id}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const editTemplate = createAsyncThunk(
  "templates/editTemplate",
  async (template) => {
    try {
      const { report_template_id, ...templateData } = template;
      const reportEdit = await axios.put(
        `${UPDATE_URL}updateReportTemplateById`,
        {
          reportTemplateId: report_template_id,
          template: templateData,
        }
      );

      return reportEdit.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const editTemplateElement = createAsyncThunk(
  "templates/editTemplateElement",
  async (template_element) => {
    try {
      const templateId = template_element.templateId;
      const { ...templateElement } = template_element.template_element;
      let response;
      if (templateElement.report_template_element_id) {
        const templateElementId = templateElement.report_template_element_id;
        response = await axios.put(
          `${UPDATE_URL}updateReportTemplateElementById`,
          {
            reportTemplateElementId: templateElementId,
            reporTemplatetElement: templateElement,
          }
        );
      } else {
        response = await axios.post(`${POST_URL}postReportTemplateElement`, {
          reportTemplateElementsData: templateElement,
          report_template_id: templateId,
        });
      }
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplate(state, action) {
      state.template = action.payload;
    },
    setTemplateStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTemplate.fulfilled, (state, action) => {
        state.status = "success";
        state.template = action.payload[0];
      })
      .addCase(fetchTemplate.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(deleteTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTemplate.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(deleteTemplate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(editTemplate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTemplate.fulfilled, (state) => {
        state.status = "edited";
      })
      .addCase(editTemplate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectTemplate = (state) => state.template.template;

export const selectTemplateStatus = (state) => state.template.status;

export const { setTemplate, setTemplateStatus } = templateSlice.actions;

export default templateSlice.reducer;
