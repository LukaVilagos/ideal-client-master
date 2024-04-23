import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteReport, selectReport } from "../../store/reports/reportSlice";
import Button from "../layout/buttons/Button";
import generateReportPDF from "../pdf/GenerateReportPDF";

const ReportActions = ({ actions, reportId }) => {
  const dispatch = useDispatch();
  const report = useSelector(selectReport);

  const handleDelete = () => {
    dispatch(deleteReport(reportId));
  };

  const handleDownload = () => {
    const pdfDoc = generateReportPDF(report.RE, report.report_name);
    pdfDoc.download(`${report.report_name}.pdf`);
  };

  const handlePrint = () => {
    const pdfDoc = generateReportPDF(report.RE, report.report_name);
    pdfDoc.print();
  };

  return actions.map((action, index) => (
    <div key={index} className="">
      {action === "Delete" && (
        <Button clickFunction={handleDelete}>Delete</Button>
      )}
      {action === "Edit" && (
        <Link to={`/report/${reportId}/edit`}>
          <Button>Edit</Button>
        </Link>
      )}
      {action === "Download" && (
        <Button clickFunction={handleDownload}>Download</Button>
      )}
      {action === "Download" && (
        <Button clickFunction={handlePrint}>Print</Button>
      )}
    </div>
  ));
};

export default ReportActions;
