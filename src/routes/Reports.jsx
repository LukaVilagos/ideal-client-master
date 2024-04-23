import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import MainNav from "../components/navigation/MainNav";
import ReportsNav from "../components/navigation/ReportsNav";
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "../store/auth/authSlice";
import { setReport } from "../store/reports/reportSlice";
import { selectReportsStatus } from "../store/reports/reportsSlice";
import Test from "../test";

function Reports() {
  const { userId, templateId } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);
  const reportsStatus = useSelector(selectReportsStatus);

  const location = useLocation();

  useEffect(() => {
    setReport(null);
  }, [location]);

  if (!activeUser) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className=" w-screen h-screen flex flex-col items-center">
        {userId !== activeUser.user_id && (
          <Navigate
            to={`/reports/${activeUser.user_id}/${templateId}`}
            replace={true}
          />
        )}
        <header className="flex items-center flex-col">
          <h1 className="my-8 text-6xl font-extrabold text-gray-900">
            Reports
          </h1>
          <MainNav userId={1} active={"reports"} />
          <ReportsNav id={activeUser.user_id} items={null} />
        </header>
        <main>
          {/* <ReportTable templateId={templateId} /> */}{" "}
          <Test templateId={templateId} />
        </main>
      </div>
    );
  }
}

export default Reports;
