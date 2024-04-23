import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import companyReducer from "./companies/companySlice";
import employeeReducer from "./employees/employeeSlice";
import reportReducer from "./reports/reportSlice";
import reportsReducer from "./reports/reportsSlice";
import templateReducer from "./templates/templateSlice";
import templatesReducer from "./templates/templatesSlice";
import usersReducer from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    report: reportReducer,
    reports: reportsReducer,
    templates: templatesReducer,
    template: templateReducer,
    users: usersReducer,
    employee: employeeReducer,
    auth: authReducer,
    company: companyReducer,
  },
});
