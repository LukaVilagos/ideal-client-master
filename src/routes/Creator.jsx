import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import MainNav from "../components/navigation/MainNav";
import CreatorComponent from "../components/smart-components/CreatorComponent";
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "../store/auth/authSlice";
import {
  fetchFirstCompany,
  selectCompany,
  selectCompanyStatus,
} from "../store/companies/companySlice";
import {
  fetchEmployee,
  selectEmployee,
} from "../store/employees/employeeSlice";
import {
  selectTemplatesStatus,
  setTemplatesStatus,
} from "../store/templates/templatesSlice";

function Creator() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);
  const companyStatus = useSelector(selectCompanyStatus);
  const company = useSelector(selectCompany);
  const employee = useSelector(selectEmployee);
  const dispatch = useDispatch();
  const templatesStatus = useSelector(selectTemplatesStatus);

  useEffect(() => {
    if (companyStatus === "idle") {
      dispatch(fetchFirstCompany());
    }
    if (company && activeUser) {
      dispatch(
        fetchEmployee({
          user_id: activeUser.user_id,
          company_id: company.company_id,
        })
      );
    }
  }, [companyStatus, activeUser]);

  if (templatesStatus === "created" && activeUser) {
    navigate(`/templates/${activeUser.user_id}`);
    dispatch(setTemplatesStatus("idle"));
  } else if (!activeUser) {
    return <Navigate to="/login" />;
  } else if (!company || !employee) {
    return <div>loading</div>;
  } else {
    return (
      <div className=" w-screen h-screen flex flex-col items-center">
        {userId !== activeUser.user_id && (
          <Navigate to={`/creator/${activeUser.user_id}`} replace={true} />
        )}
        <header className="flex items-center flex-col">
          <h1 className="my-8 text-6xl font-extrabold text-gray-900">
            Creator
          </h1>
          <MainNav userId={userId} active={"creator"} />
        </header>
        <main className="mt-8">
          <CreatorComponent
            type={"report"}
            objectTemplates={null}
            companyId={company.company_id}
            employeeId={employee.employee_id}
          />
        </main>
      </div>
    );
  }
}

export default Creator;
