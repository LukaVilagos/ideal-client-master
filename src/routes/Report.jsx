import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import ReportOrObjectHeader from "../components/layout/headers/ReportOrObjectHeader";
import TemplateHeader from "../components/layout/headers/TemplateHeader";
import MainNav from "../components/navigation/MainNav";
import ReportActions from "../components/reportsAndTemplates/ReportActions";
import TemplateElements from "../components/reportsAndTemplates/TemplateElements";
import ReturnReporTemplateActions from "../components/reportsAndTemplates/utils/ReturnReporTemplateActions";
import ReportElements from "../components/table/report/ReportElements";
import {
  selectActiveUser,
  selectActiveUserLoading,
  selectIsAuthenticated,
} from "../store/auth/authSlice";
import {
  fetchReport,
  selectReport,
  selectReportStatus,
  setReportStatus,
} from "../store/reports/reportSlice";
import { setReportsStatus } from "../store/reports/reportsSlice";

function Report() {
  const { reportId, mode } = useParams();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);
  const isLoading = useSelector(selectActiveUserLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const report = useSelector(selectReport);

  const reportStatus = useSelector(selectReportStatus);

  useEffect(() => {
    if (reportStatus === "idle" || reportId !== report.report_id) {
      dispatch(fetchReport(reportId));
    }
  }, []);

  if (reportStatus === "deleted" || (reportStatus === "edited" && activeUser)) {
    navigate(`/reports/${activeUser.user_id}/all`);
    dispatch(setReportStatus("idle"));
    dispatch(setReportsStatus("idle"));
  } else if (!activeUser) {
    return <Navigate to="/login" />;
  } else if (!report || reportId !== report.report_id) {
    return <div>loading</div>;
  } else {
    return (
      <div className=" w-screen h-screen flex flex-col items-center">
        {reportId !== report.report_id && (
          <Navigate to={`/report/${report.report_id}/view`} replace={true} />
        )}
        {mode === "view" && (
          <>
            <header className="flex items-center flex-col">
              <h1 className="my-8 text-6xl font-extrabold text-gray-900">
                Report
              </h1>
              <MainNav userId={1} active={"reports"} />
            </header>
            <main>
              <ReportOrObjectHeader object={report} />
              <ReportActions
                actions={ReturnReporTemplateActions({
                  canView: true,
                  canEdit: true,
                  canCreate: true,
                  canManage: true,
                  canDownload: true,
                  canDelete: true,
                  canActivateDeactivateObjects: true,
                }).splice(1, 4)}
                reportId={reportId}
              />
              <ReportElements elements={report.RE} />
            </main>
          </>
        )}
        {mode === "edit" && (
          <>
            <header className="flex items-center flex-col">
              <h1 className="my-8 text-6xl font-extrabold text-gray-900">
                Report
              </h1>
              <MainNav userId={1} active={"reports"} />
            </header>
            <main>
              <TemplateHeader mode={mode} report={report} />
              <TemplateElements
                template={report}
                mode={mode}
                reportId={reportId}
              />
            </main>
          </>
        )}
      </div>
    );
  }
}

export default Report;
