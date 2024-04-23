import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployee,
  selectEmployee,
} from "../../store/employees/employeeSlice";
import { editReport, editReportElement } from "../../store/reports/reportSlice";
import { addNewReport } from "../../store/reports/reportsSlice";
import { selectTemplateStatus } from "../../store/templates/templateSlice";
import Button from "../layout/buttons/Button";
import InputDate from "../layout/inputs/InputDate";
import InputDateTime from "../layout/inputs/InputDateTime";
import InputNumber from "../layout/inputs/InputNumber";
import InputOptions from "../layout/inputs/InputOptions";
import InputOptionsCheckbox from "../layout/inputs/InputOptionsCheckbox";
import InputText from "../layout/inputs/InputText";
import InputTextDataList from "../layout/inputs/InputTextDataList";
import InputTime from "../layout/inputs/InputTime";
import PrimaryLabel from "../layout/labels/PrimaryLabel";

const TemplateElements = ({
  lastEdited,
  submission_date,
  template,
  mode,
  userId,
  companyId,
  reportId,
}) => {
  const dispatch = useDispatch();
  const templateStatus = useSelector(selectTemplateStatus);
  const employee = useSelector(selectEmployee);
  const [templateId, setTemplateId] = useState("");
  const [reportName, setReportName] = useState("");
  const [reportData, setReportData] = useState([]);
  const [submissionDate, setSubmissionDate] = useState(
    submission_date ? submission_date : JSON.stringify(new Date())
  );
  const [lastEditedTime, setLastEditedTime] = useState(
    lastEdited ? lastEdited : null
  );

  useEffect(() => {
    if (mode === "edit") {
      setReportData(template.RE);
      setReportName(template.report_name);
    } else {
      if (templateStatus === "success") {
        dispatch(fetchEmployee({ user_id: userId, company_id: companyId }));
        setReportData(template.RTE);
        setTemplateId(template.report_template_id);
      }
    }
  }, []);

  const handleSubmitReport = () => {
    const reportElements = reportData.map((element) => {
      let filteredItem;
      if (mode === "edit") {
        filteredItem = {
          report_element_id: element.report_element_id,
          report_template_element_id: element.report_template_element_id,
          report_element_value: element.report_element_value,
        };
      } else {
        filteredItem = {
          report_template_element_id: element.report_template_element_id,
          report_element_value: element.report_element_value,
        };
      }
      return filteredItem;
    });
    if (mode === "edit") {
      reportElements.map((element) => {
        dispatch(editReportElement(element));
      });
      dispatch(
        editReport({
          report_id: template.report_id,
          report_name: reportName,
          report_template_id: template.report_template_id,
          created_at: template.created_at,
          last_edited: new Date(),
          employee_id: template.employee_id,
          company_id: template.company_id,
        })
      );
    } else {
      dispatch(
        addNewReport({
          report_name: reportName,
          report_template_id: templateId,
          created_at: submissionDate,
          last_edited: lastEdited ? new Date() : submissionDate,
          employee_id: employee.employee_id,
          company_id: template.company_id,
          elements: reportElements,
        })
      );
    }
  };

  const handleChangeReportData = (id, value) => {
    setReportData((prevState) => {
      const updatedData = prevState.map((data) => {
        if (data.report_template_element_id === id) {
          return {
            ...data,
            report_element_value: value,
          };
        }
        return data;
      });
      return updatedData;
    });
  };

  return (
    <>
      <PrimaryLabel>{reportName !== "" && "✔  "}Name</PrimaryLabel>
      <InputText
        name={"name"}
        onChange={setReportName}
        value={reportName ? reportName : ""}
      />
      {reportData.map((element) => (
        <div key={element.report_template_element_id}>
          <PrimaryLabel>
            {element.report_element_value &&
            element.report_element_value.length > 0
              ? "✔  "
              : null}
            {mode
              ? element.RTE.report_template_element_name
              : element.report_template_element_name}
          </PrimaryLabel>
          {element.report_template_element_type === "text" && (
            <InputTextDataList
              element={element}
              onChange={handleChangeReportData}
              value={mode === "edit" ? element.report_element_value : null}
            />
          )}
          {element.report_template_element_type === "options" && (
            <InputOptionsCheckbox
              options={element.RTE.report_template_element_options}
              onChange={handleChangeReportData}
              name={element.report_template_element_id}
              value={mode === "edit" ? element.report_element_value : null}
            />
          )}
          {element.report_template_element_type === "number" && (
            <InputNumber
              name={element.report_template_element_id}
              onChange={handleChangeReportData}
              value={mode === "edit" ? element.report_element_value : null}
            />
          )}
          {element.report_template_element_type === "date/time" && (
            <InputDateTime
              name={element.report_template_element_id}
              onChange={handleChangeReportData}
              value={mode === "edit" ? element.report_element_value : null}
            />
          )}
          {element.report_template_element_type === "date" && (
            <InputDate
              name={element.report_template_element_id}
              onChange={handleChangeReportData}
              value={mode === "edit" ? element.value : null}
            />
          )}
          {element.report_template_element_type === "time" && (
            <InputTime
              name={element.report_template_element_id}
              onChange={handleChangeReportData}
              value={mode === "edit" ? element.report_element_value : null}
            />
          )}
          {element.report_template_element_type === "images" && (
            <div>
              <input
                type="file"
                multiple
                className="border rounded w-full my-2 p-2"
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files).slice(
                    0,
                    element.imageCount
                  );
                  handleChangeReportData(
                    element.report_template_element_id,
                    JSON.stringify(files)
                  );
                }}
                value={
                  element.report_element_value
                    ? JSON.parse(element.report_element_value)
                    : null
                }
              />
              <div className="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 place-items-center gap-2">
                {element.report_element_value &&
                  element.report_element_value.map((image, index) => {
                    return (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        className=" max-w-sm rounded-lg"
                      />
                    );
                  })}
              </div>
            </div>
          )}
          {element.report_template_element_type === "object" && (
            <InputOptions
              name={element.report_template_element_id}
              items={element.objects}
              setItem={handleChangeReportData}
              value={mode === "edit" ? element.report_element_value : null}
            />
          )}
          {element.RTE?.report_template_element_type === "text" && (
            <InputTextDataList
              element={element.RTE ? element.RTE : element}
              onChange={handleChangeReportData}
              value={mode === "edit" ? element.report_element_value : null}
            />
          )}
          {element.RTE?.report_template_element_type === "options" && (
            <InputOptionsCheckbox
              options={element.RTE?.report_template_element_options}
              onChange={handleChangeReportData}
              name={element.report_template_element_id}
              value={mode === "edit" ? element.report_element_value : null}
            />
          )}
          {element.RTE?.report_template_element_type === "number" && (
            <InputNumber
              name={element.report_template_element_id}
              onChange={handleChangeReportData}
              value={mode === "edit" ? element.report_element_value : null}
            />
          )}
          {element.RTE?.report_template_element_type === "date/time" && (
            <InputDateTime
              name={element.report_template_element_id}
              onChange={handleChangeReportData}
              value={mode === "edit" ? element.report_element_value : null}
            />
          )}
          {element.RTE?.report_template_element_type === "date" && (
            <InputDate
              name={element.report_template_element_id}
              onChange={handleChangeReportData}
              value={mode === "edit" ? element.value : null}
            />
          )}
          {element.RTE?.report_template_element_type === "time" && (
            <InputTime
              name={element.report_template_element_id}
              onChange={handleChangeReportData}
              value={mode === "edit" ? element.report_element_value : null}
            />
          )}
          {element.RTE?.report_template_element_type === "images" && (
            <div>
              <input
                type="file"
                multiple
                className="border rounded w-full my-2 p-2"
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files).slice(
                    0,
                    element.imageCount
                  );
                  handleChangeReportData(
                    element.report_template_element_id,
                    JSON.stringify(files)
                  );
                }}
                value={
                  element.report_element_value
                    ? JSON.parse(element.report_element_value)
                    : null
                }
              />
              <div className="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 place-items-center gap-2">
                {element.report_element_value &&
                  element.report_element_value.map((image, index) => {
                    return (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        className=" max-w-sm rounded-lg"
                      />
                    );
                  })}
              </div>
            </div>
          )}
          {element.RTE?.report_template_element_type === "object" && (
            <InputOptions
              name={element.report_template_element_id}
              items={element.objects}
              setItem={handleChangeReportData}
              value={mode === "edit" ? element.report_element_value : null}
            />
          )}
          {/* {element.type === "signature" && (
            <InputCheckbox
              labelText="Sign the document?"
              name={element.id}
              onChange={handleChangeReportData}
              value={mode === "edit" ? element.value : null}
            />
          )} */}
        </div>
      ))}
      <div className="flex justify-end my-4">
        <Button clickFunction={handleSubmitReport}>Submit</Button>
      </div>
    </>
  );
};

export default TemplateElements;
