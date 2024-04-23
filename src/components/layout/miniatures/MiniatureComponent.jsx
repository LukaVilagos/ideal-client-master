import { FaEdit, FaEye, FaFileDownload, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../buttons/Button";
import DownloadButton from "../buttons/DownloadButton";
import EditButton from "../buttons/EditButton";
import ViewButton from "../buttons/ViewButton";

const MiniatureComponent = ({
  item,
  actions,
  handleDownload,
  handleDelete,
  type,
  templateType,
}) => {
  let link;
  switch (type) {
    case "report":
      link = "/report/" + item.report_template_id;
      break;
    case "company":
      link = "/company-dashboard/" + item.report_template_id;
      break;
    case "template":
      link = "/template/" + item.report_template_id;
      break;
    default:
      link = "/error/" + item.report_template_id;
      break;
  }
  return (
    <div className="border-2 w-64 rounded-xl">
      <div className="flex justify-start pt-2 pl-2">
        <div>
          {actions.includes("Delete") ? (
            <Button clickFunction={() => handleDelete(item.report_template_id)}>
              <FaTrash />
            </Button>
          ) : null}
        </div>
      </div>
      <div className="border-b-2 grid items-center pb-8">
        <div className="text-center">
          <h3>{new Date(item.created_at).toLocaleDateString("hr")}</h3>
          <h4 className="text-xl font-bold pb-1 mt-[-5px] w-64 text-center">
            {item.report_template_name}
          </h4>
        </div>
      </div>
      <div className="p-2 flex justify-between gap-2 w-full">
        <div>
          {actions.includes("Download") ? (
            <DownloadButton
              clickFunction={() => handleDownload(item)}
              square={true}
            >
              <FaFileDownload />
            </DownloadButton>
          ) : null}
        </div>
        <div>
          {actions.includes("Edit") ? (
            <Link
              to={`${link}${
                type === "report" || type === "template" ? "/edit" : ""
              }`}
            >
              <EditButton square={true}>
                <FaEdit />
              </EditButton>
            </Link>
          ) : null}
        </div>
        <div>
          {actions.includes("View") ? (
            <Link
              to={`${link}${
                type === "report" || type === "template" ? "/view" : ""
              }`}
            >
              <ViewButton square={true}>
                <FaEye />
              </ViewButton>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MiniatureComponent;
