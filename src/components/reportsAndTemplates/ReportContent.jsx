import { useSelector } from "react-redux";
import { selectReport } from "../../store/reports/reportSlice";
import PrimarySpan from "../layout/spans/PrimarySpan";

const ReportContent = () => {
  const item = useSelector(selectReport);

  return Object.entries(item)
    .slice(0, 4)
    .map(([key, value]) => (
      <PrimarySpan key={key}>
        {key}: {value}
      </PrimarySpan>
    ));
};

export default ReportContent;
