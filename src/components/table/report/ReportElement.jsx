import { useState } from "react";

const ReportElement = ({ elements }) => {
  const [displayedArray, setDisplayedArray] = useState();

  return elements.map((element, index) => {
    if (element.type === "object" && element.report_element_value) {
      return (
        <td>
          <div>{element.name}</div>
          {Object.entries(element.report_element_value).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
        </td>
      );
    } else if (
      (element.RTE.report_template_element_name === "images" ||
        element.RTE.report_template_element_name === "options") &&
      element.report_element_value
    ) {
      return (
        <td>
          <div>{element.name}</div>
          {element.report_element_value.map((item, i) => (
            <div key={i} className="flex">
              {item}
            </div>
          ))}
        </td>
      );
    } else if (element.RTE.report_template_element_name === "signature") {
      if (element.report_element_value) {
        return <div>✅</div>;
      } else {
        return <div>❌</div>;
      }
    } else if (
      element.RTE.report_template_element_type === "date" ||
      element.RTE.report_template_element_type === "time" ||
      element.RTE.report_template_element_type === "date/time"
    ) {
      return (
        <td key={index} className="flex flex-col h-full text-center">
          <span>
            {new Date(element.report_element_value).toLocaleString("hr")}
          </span>
        </td>
      );
    } else if (element.report_element_value === null) {
      return <td>elemnet has no value</td>;
    }
    {
      return (
        <td key={index} className="flex flex-col h-full text-center">
          <span>{element.report_element_value}</span>
        </td>
      );
    }
  });
};

export default ReportElement;
