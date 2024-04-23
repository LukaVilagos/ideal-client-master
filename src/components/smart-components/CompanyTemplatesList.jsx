import { useDispatch } from "react-redux";
import { deleteTemplate } from "../../store/templates/templatesSlice";
import MiniatureComponent from "../layout/miniatures/MiniatureComponent";
import MiniatureWrapper from "../layout/miniatures/MiniatureWrapper";
import generatePDF from "../pdf/GeneratePDF";

const CompanyTemplatesList = ({ actions, templates }) => {
  const dispatch = useDispatch();

  const handleDownload = (template) => {
    console.log(template);
    const pdfDoc = generatePDF(template.RTE, template.report_template_name);
    pdfDoc.download(`${template.report_template_name}.pdf`);
  };

  const handleDelete = (templateId) => {
    dispatch(deleteTemplate(templateId));
  };

  return (
    <MiniatureWrapper>
      {templates.map((template) => (
        <MiniatureComponent
          handleDownload={handleDownload}
          handleDelete={handleDelete}
          key={template.report_template_id}
          item={template}
          actions={actions}
          type="template"
          templateType="report"
        />
      ))}
    </MiniatureWrapper>
  );
};

export default CompanyTemplatesList;
