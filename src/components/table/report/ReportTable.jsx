import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteReport,
  fetchReports,
  selectAllReports,
  selectReportsStatus,
} from "../../../store/reports/reportsSlice";
import {
  selectTemplate,
  selectTemplateStatus,
} from "../../../store/templates/templateSlice";
import Button from "../../layout/buttons/Button";
import generateReportPDF from "../../pdf/GenerateReportPDF";
import ReportElement from "./ReportElement";

const ReportTable = ({ templateId }) => {
  const template = useSelector(selectTemplate);
  const reports = useSelector(selectAllReports);
  const reportsStatus = useSelector(selectReportsStatus);
  const templateStatus = useSelector(selectTemplateStatus);

  const [employee, setEmployee] = useState({});
  const [selectedReports, setSelectedReports] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (reportsStatus === "idle") {
      dispatch(fetchReports());
    }
  }, [reportsStatus]);

  console.log(reports);

  const downloadPdf = () => {
    reports.map((report) => {
      if (selectedReports.includes(report.id)) {
        const pdfDoc = generateReportPDF(report.elements, report.name);
        pdfDoc.download(`${report.name}.pdf`);
      }
    });
  };

  const printPDF = () => {
    reports.map((report) => {
      if (selectedReports.includes(report.id)) {
        const pdfDoc = generateReportPDF(report.elements, report.name);
        pdfDoc.print();
      }
    });
  };

  const deleteReports = () => {
    reports.map((report) => {
      if (selectedReports.includes(report.report_id)) {
        dispatch(deleteReport(report.report_id));
        selectedReports.filter((item) => item !== report.report_id);
      }
    });
  };

  const selectReport = (id) => {
    if (selectedReports.includes(id)) {
      const newReports = selectedReports.filter((reportId) => reportId !== id);
      setSelectedReports(newReports);
      return;
    }

    setSelectedReports([...selectedReports, id]);
  };

  return (
    <>
      {employee && (
        <div>
          <div>
            {employee.last_name} {employee.first_name}
          </div>
          <div>{employee.email}</div>
        </div>
      )}
      <div className="flex justify-between bg-white">
        <div>filter by</div>
        <h3>{template.name} Reports</h3>
        <div>
          <Button clickFunction={printPDF}>Print</Button>
          <Button clickFunction={downloadPdf}>Download</Button>
          <Button clickFunction={deleteReports}>Delete</Button>
        </div>
      </div>
      <table className="w-full bg-white border">
        <thead>
          <tr className="border">
            <th className="w-16"></th>
            <th>
              <div className="flex uppercase border">
                <div>name</div>
                <div> ↕ </div>
              </div>
            </th>
            <th>
              <div className="flex uppercase border">
                <div>creator</div>
                <div> ↕ </div>
              </div>
            </th>
            <th>
              <div className="flex uppercase border">
                <div>created</div>
                <div> ↕ </div>
              </div>
            </th>
            {template.elements.map((element) => (
              <th key={element.id}>
                <div className="flex uppercase border">
                  <div>{element.name}</div>
                  <div> ↕ </div>
                </div>
              </th>
            ))}
            <th>
              <div className="flex uppercase border">
                <div>actions</div>
              </div>
            </th>
          </tr>
          <tr>
            <th className="w-16"></th>
            <th>
              <div className="flex uppercase border">
                <div>🔍 </div>
                <div> Search... </div>
              </div>
            </th>
            <th>
              <div className="flex uppercase border">
                <div>🔍 </div>
                <div> Search... </div>
              </div>
            </th>
            <th>
              <div className="flex uppercase border">
                <div>🔍 </div>
                <div> Search... </div>
              </div>
            </th>
            {template.elements.map((element) => (
              <th key={`${element.id}1`}>
                <div className="flex uppercase border">
                  <div>🔍 </div>
                  <div> Search... </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reports
            ? reports.map((report) => (
                <tr key={report.id}>
                  <td className="w-16 flex flex-col items-center justify-center">
                    <div>
                      <Button clickFunction={() => selectReport(report.id)}>
                        ⭕
                      </Button>
                    </div>
                  </td>
                  <td>{report.name}</td>
                  <td>
                    <Button clickFunction={() => setEmployee(report.creator)}>
                      {report.creator.firstName} {report.creator.lastName}
                    </Button>
                  </td>
                  <td>{report.createdAt}</td>
                  <ReportElement elements={report.elements} />
                  <td>
                    <Button>
                      <Link to={`/report/${report.id}/edit`}>Edit</Link>
                    </Button>
                    <Button>
                      <Link to={`/report/${report.id}/view`}>View</Link>
                    </Button>
                  </td>
                </tr>
              ))
            : "No reports Submitted"}
        </tbody>
      </table>
      <div className="flex justify-between bg-white">
        <div className="flex">
          <div>items per page</div>
          <div>10</div>
        </div>
        <div className="flex">
          <div> ↩ </div>
          <div>1</div>
          <div> ↪ </div>
        </div>
        <div>1/10</div>
      </div>
    </>
  );
};

export default ReportTable;
