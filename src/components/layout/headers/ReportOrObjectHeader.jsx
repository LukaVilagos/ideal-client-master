import { memo } from "react";
import SecondaryHeading from "../headings/SecondaryHeading";
import HeaderWrapper from "./HeaderWrapper";

const ReportOrObjectHeader = ({ object }) => {
  return (
    <HeaderWrapper>
      <div>
        <SecondaryHeading className="text-3xl font-bold">
          {object.report_name}
        </SecondaryHeading>
        <div c>
          <p>{object.created_at}</p>
          <p>
            {object.Employee.User.first_name} {object.Employee.User.last_name}
          </p>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default memo(ReportOrObjectHeader);
