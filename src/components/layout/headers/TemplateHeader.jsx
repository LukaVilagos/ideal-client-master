import { useSelector } from "react-redux";
import { selectTemplate } from "../../../store/templates/templateSlice";

const TemplateHeader = ({ mode, report }) => {
  const template = useSelector(selectTemplate);

  if (mode === "edit") {
    return (
      <div className="py-8">
        <h2 className="text-3xl font-bold">{report.report_name}</h2>
        <p>{report.created_at}</p>
      </div>
    );
  } else {
    return (
      <div className="py-8">
        <h2 className="text-3xl font-bold">{template.report_template_name}</h2>
        <p>{template.created_at}</p>
      </div>
    );
  }
};

export default TemplateHeader;
