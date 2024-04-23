import { useState } from "react";

const ReportElements = ({ elements }) => {
  const [displayedArray, setDisplayedArray] = useState();

  return elements.map((element, index) => {
    console.log(element);
    if (element.type === "object" && element.report_element_value) {
      return (
        <>
          <div>{element.name}</div>
          {Object.entries(element.report_element_value).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
        </>
      );
    } else if (
      (element.RTE.report_template_element_name === "images" ||
        element.RTE.report_template_element_name === "options") &&
      element.report_element_value
    ) {
      return (
        <>
          <div>{element.name}</div>
          {element.report_element_value.map((item, i) => (
            <div key={i} className="flex">
              {item}
            </div>
          ))}
        </>
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
        <div key={index} className="flex flex-col h-full">
          <span>
            {new Date(element.report_element_value).toLocaleString("hr")}
          </span>
        </div>
      );
    } else if (element.report_element_value === null) {
      return <div>elemnet has no value</div>;
    }
    {
      return (
        <div key={index} className="flex flex-col h-full">
          <span>{element.report_element_value}</span>
        </div>
      );
    }
  });
};

export default ReportElements;
