import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import MainNav from "../components/navigation/MainNav";
import CompanyTemplatesList from "../components/smart-components/CompanyTemplatesList";
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "../store/auth/authSlice";
import { setTemplate } from "../store/templates/templateSlice";
import {
  fetchTemplates,
  selectAllTemplates,
  selectTemplatesStatus,
} from "../store/templates/templatesSlice";
import ReturnReporTemplateActions from "./../components/reportsAndTemplates/utils/ReturnReporTemplateActions";

function Templates() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);
  const dispatch = useDispatch();
  const templates = useSelector(selectAllTemplates);
  const location = useLocation();

  const templatesStatus = useSelector(selectTemplatesStatus);

  useEffect(() => {
    if (templatesStatus === "idle") {
      dispatch(fetchTemplates());
    }
    setTemplate(null);
  }, [dispatch, templatesStatus, location]);

  if (!activeUser) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className=" w-screen h-screen flex flex-col items-center">
        {userId !== activeUser.user_id && (
          <Navigate to={`/templates/${activeUser.user_id}`} replace={true} />
        )}
        <header className="flex items-center flex-col">
          <h1 className="my-8 text-6xl font-extrabold text-gray-900">
            Templates
          </h1>
          <MainNav userId={1} active={"templates"} />
        </header>
        <main className="mt-6">
          <CompanyTemplatesList
            actions={ReturnReporTemplateActions({
              canView: true,
              canEdit: true,
              canCreate: true,
              canManage: true,
              canDownload: true,
              canDelete: true,
              canActivateDeactivateObjects: true,
            })}
            templates={templates}
          />
        </main>
      </div>
    );
  }
}

export default Templates;
