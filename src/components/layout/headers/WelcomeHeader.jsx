import CompanyButtons from "../../companies/CompanyButtons";
import PrimaryHeading from "../headings/PrimaryHeading";

const WelcomeHeader = ({ activeUser }) => {
  return (
    <div className="flex items-center px-4 py-8 flex-col">
      <img
        alt=""
        className="w-48 h-48 rounded-full object-cover ml-4 bg-gray-800"
        src={activeUser.picture}
      />
      <PrimaryHeading>
        Welcome {activeUser ? activeUser.name : null}!
      </PrimaryHeading>
      <CompanyButtons activeUser={activeUser} />
    </div>
  );
};

export default WelcomeHeader;
