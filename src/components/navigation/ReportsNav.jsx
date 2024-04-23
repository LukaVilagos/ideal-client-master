import { NavLink } from "react-router-dom";
import Button from "../layout/buttons/Button";
import NavWrapper from "../layout/navbar/NavWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTemplates,
  selectAllTemplates,
  selectTemplatesStatus,
} from "../../store/templates/templatesSlice";
import { useEffect } from "react";

const ReportsNav = ({ id }) => {
  const dispatch = useDispatch();
  const templates = useSelector(selectAllTemplates);
  const templatesStatus = useSelector(selectTemplatesStatus);

  useEffect(() => {
    if (templatesStatus === "idle") {
      dispatch(fetchTemplates());
    }
  }, [dispatch, templatesStatus]);

  return (
    <NavWrapper>
      <NavLink to={`/reports/${id}/all`}>
        <Button>All</Button>
      </NavLink>
      {templates &&
        templates.map((item) => (
          <NavLink
            key={item.report_template_id}
            to={`/reports/${id}/${item.report_template_id}`}
          >
            <Button>{item.report_template_name}</Button>
          </NavLink>
        ))}
    </NavWrapper>
  );
};

export default ReportsNav;
