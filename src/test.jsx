import { useEffect, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaFileDownload,
  FaRegFilePdf,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import CloseButton from "./components/layout/buttons/CloseButton";
import DownloadButton from "./components/layout/buttons/DownloadButton";
import EditButton from "./components/layout/buttons/EditButton";
import EmployeeButton from "./components/layout/buttons/EmployeeButton";
import PrintButton from "./components/layout/buttons/PrintButton";
import SelectButton from "./components/layout/buttons/SelectButton";
import ViewButton from "./components/layout/buttons/ViewButton";
import PopupComponent from "./components/layout/popups/PopupComponent";
import generateReportPDF from "./components/pdf/GenerateReportPDF";
import ReportElement from "./components/table/report/ReportElement";
import {
  deleteReport,
  fetchReportsByReportTemplate,
  selectAllReports,
  selectReportsStatus,
} from "./store/reports/reportsSlice";
import { fetchTemplate, selectTemplate } from "./store/templates/templateSlice";

const EmptyCols = ({ numb }) => {
  for (let i = 0; i < numb; i++) {
    return <td className="border-l text-center px-2">value is null</td>;
  }
};

const Test = ({ templateId }) => {
  const template = useSelector(selectTemplate);
  const reports = useSelector(selectAllReports);
  const reportsStatus = useSelector(selectReportsStatus);
  const dispatch = useDispatch();
  const location = useLocation();

  const [employee, setEmployee] = useState();
  const [selectedReports, setSelectedReports] = useState([]);

  useEffect(() => {
    dispatch(fetchReportsByReportTemplate(templateId));
    dispatch(fetchTemplate(templateId));
  }, [location]);

  const downloadPdf = () => {
    reports.map((report) => {
      if (selectedReports.includes(report.report_id)) {
        const pdfDoc = generateReportPDF(report.RE, report.report_name);
        pdfDoc.download(`${report.report_name}.pdf`);
      }
    });
  };

  const printPDF = () => {
    reports.map((report) => {
      if (selectedReports.includes(report.report_id)) {
        const pdfDoc = generateReportPDF(report.RE, report.report_name);
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

  if (reportsStatus === "success" && template) {
    return (
      <div className="bg-white border-2 max-h-[70vh] min-w-[72rem] rounded-lg w-full max-w-6xl overflow-y-scroll">
        {employee && (
          <PopupComponent>
            <div>
              <div className="flex w-full justify-end">
                <CloseButton clickFunction={() => setEmployee(null)}>
                  X
                </CloseButton>
              </div>
              <div>
                <span className=" font-bold">Name:</span> {employee.last_name}{" "}
                {employee.first_name}
              </div>
              <div>
                <span className="font-bold">Email:</span> {employee.email}
              </div>
              <div>
                <span className="font-bold">Member since:</span>{" "}
                {new Date(employee.created_at).toLocaleDateString("hr")}
              </div>
            </div>
          </PopupComponent>
        )}
        <div className="flex justify-between py-2 px-4 items-center sticky top-0 bg-white border-b">
          <div>
            <h3 className="text-xl uppercase tracking-widest">
              {template.report_template_name} Reports
            </h3>
          </div>
          <div className="flex gap-2">
            <PrintButton clickFunction={printPDF}>
              <FaRegFilePdf />
            </PrintButton>
            <DownloadButton clickFunction={downloadPdf}>
              <FaFileDownload />
            </DownloadButton>
            <CloseButton clickFunction={deleteReports}>
              <FaTrash />
            </CloseButton>
          </div>
        </div>
        <table className="w-full bg-white border">
          <thead>
            <tr className="border-y-2">
              <th className="w-16"></th>
              <th>
                <div className="flex uppercase items-center justify-center p-4 border-l">
                  <div>name</div>
                </div>
              </th>
              <th>
                <div className="flex uppercase items-center justify-center p-4 border-l">
                  <div>creator</div>
                </div>
              </th>
              <th>
                <div className="flex uppercase items-center justify-center p-4 border-l">
                  <div>created</div>
                </div>
              </th>
              <th>
                <div className="flex uppercase items-center justify-center p-4 border-l">
                  <div>template</div>
                </div>
              </th>
              {template.RTE.map((element) => (
                <th key={element.report_template_element_id}>
                  <div className="flex uppercase items-center justify-center p-4 border-l max-w-4xl">
                    <div>{element.report_template_element_name}</div>
                  </div>
                </th>
              ))}
              <th>
                <div className="flex uppercase items-center justify-center p-4 border-l">
                  <div>actions</div>
                </div>
              </th>
            </tr>
            {/* <tr className="border-b-2">
              <th className="w-16"></th>
              <th>
                <div className="flex uppercase items-center justify-center p-4 border-l">
                  <div>🔍 </div>
                  <div> Search... </div>
                </div>
              </th>
              <th>
                <div className="flex uppercase items-center justify-center p-4 border-l">
                  <div>🔍 </div>
                  <div> Search... </div>
                </div>
              </th>
              <th>
                <div className="flex uppercase items-center justify-center p-4 border-l">
                  <div>🔍 </div>
                  <div> Search... </div>
                </div>
              </th>
              <th>
                <div className="flex uppercase items-center justify-center p-4 border-l">
                  <div>🔍 </div>
                  <div> Search... </div>
                </div>
              </th>
              <th>
                <div className="flex uppercase p-4 border-l items-center justify-center  max-w-4xl">
                  <div>🔍 </div>
                  <div> Search... </div>
                </div>
              </th>
              <th className="border-l "></th>
            </tr> */}
          </thead>
          <tbody>
            {reports
              ? reports.map((report, index) => (
                  <tr key={index} className="border-b">
                    <td className="w-16 flex flex-col items-center justify-center">
                      <SelectButton
                        isSelected={selectedReports.includes(report.report_id)}
                        clickFunction={() => selectReport(report.report_id)}
                      />
                    </td>
                    <td className=" border-l text-center px-2">
                      {report.report_name}
                    </td>
                    {console.log(report)}
                    <td className="border-l px-2 text-center">
                      <EmployeeButton
                        clickFunction={() => setEmployee(report.Employee.User)}
                      >
                        {report.Employee.User.first_name}{" "}
                        {report.Employee.User.last_name}
                      </EmployeeButton>
                    </td>
                    <td className="border-l px-2 text-center">
                      {new Date(report.created_at).toLocaleString("hr")}
                    </td>
                    <td className="border-l px-2 text-center">
                      {report.Report_Template.report_template_name}
                    </td>
                    <td className="flex max-w-4xl overflow-x-scroll border-l px-2 h-full justify-between items-center p-4">
                      <ReportElement elements={report.RE} tableMode={true} />
                    </td>
                    {console.log(report.RE.length, template.RTE.length)}
                    {report.RE.length < template.RTE.length && (
                      <EmptyCols
                        numb={template.RTE.length - report.RE.length}
                      />
                    )}
                    <td className="border-l">
                      <div className="flex gap-2 justify-center">
                        <Link to={`/report/${report.report_id}/edit`}>
                          <EditButton>
                            <FaEdit />
                          </EditButton>
                        </Link>
                        <Link to={`/report/${report.report_id}/view`}>
                          <ViewButton>
                            <FaEye />
                          </ViewButton>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              : "No reports Submitted"}
          </tbody>
        </table>
        {/* <div className="flex justify-between bg-white">
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
        </div> */}
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};

export default Test;
