import { memo } from "react";
import SecondaryHeading from "../layout/headings/SecondaryHeading";
import MiniatureComponent from "../layout/miniatures/MiniatureComponent";
import MiniatureWrapper from "../layout/miniatures/MiniatureWrapper";

function RecentReports({ reports, actions, handleDownload, handleDelete }) {
  return (
    <div className="mt-4">
      <SecondaryHeading>Recent Reports</SecondaryHeading>
      <MiniatureWrapper>
        {reports.map((report) => (
          <MiniatureComponent
            item={report}
            key={report.id}
            actions={actions}
            handleDownload={handleDownload}
            handleDelete={handleDelete}
            type="report"
          />
        ))}
      </MiniatureWrapper>
    </div>
  );
}

export default memo(RecentReports);
