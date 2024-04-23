import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import TemplateHeader from "../components/layout/headers/TemplateHeader";
import MainNav from "../components/navigation/MainNav";
import TemplateElements from "../components/reportsAndTemplates/TemplateElements";
import CreatorComponent from "../components/smart-components/CreatorComponent";
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "../store/auth/authSlice";
import {
  selectReportsStatus,
  setReportsStatus,
} from "../store/reports/reportsSlice";
import {
  fetchTemplate,
  selectTemplate,
  selectTemplateStatus,
  setTemplateStatus,
} from "../store/templates/templateSlice";
import { setTemplatesStatus } from "../store/templates/templatesSlice";

function Template() {
  const { templateId, mode } = useParams();
  const template = useSelector(selectTemplate);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const activeUser = useSelector(selectActiveUser);
  const dispatch = useDispatch();
  const templateStatus = useSelector(selectTemplateStatus);
  const reportsStatus = useSelector(selectReportsStatus);

  useEffect(() => {
    if (
      templateStatus === "idle" ||
      templateId !== template.report_template_id
    ) {
      dispatch(fetchTemplate(templateId));
    }
  }, [reportsStatus]);

  if (reportsStatus === "created" && activeUser) {
    navigate(`/reports/${activeUser.user_id}/all`);
    dispatch(setReportsStatus("idle"));
  } else if (
    templateStatus === "deleted" ||
    (templateStatus === "edited" && activeUser)
  ) {
    navigate(`/templates/${activeUser.user_id}`);
    dispatch(setTemplateStatus("idle"));
    dispatch(setTemplatesStatus("idle"));
  } else if (!activeUser) {
    return <Navigate to="/login" />;
  } else if (!template || templateId !== template.report_template_id) {
    return <div>loading</div>;
  } else {
    return (
      <div className=" w-screen h-screen flex flex-col items-center">
        {mode === "view" && (
          <>
            <header className="flex items-center flex-col">
              <h1 className="my-8 text-6xl font-extrabold text-gray-900">
                Template
              </h1>
              <MainNav userId={1} active={"templates"} />
            </header>
            <main>
              <TemplateHeader />
              <TemplateElements
                template={template}
                userId={activeUser.user_id}
                companyId={template.company_id}
              />
            </main>
          </>
        )}
        {mode === "edit" && (
          <>
            <header className="flex items-center flex-col">
              <h1 className="my-8 text-6xl font-extrabold text-gray-900">
                Template
              </h1>
              <MainNav userId={1} active={"templates"} />
            </header>
            <main>
              <TemplateHeader />
              <CreatorComponent
                type={"report"}
                objectTemplates={null}
                template={template}
                elements={template.RTE}
                mode={mode}
                name={template.report_template_name}
              />
            </main>
          </>
        )}
      </div>
    );
  }
}

export default Template;
