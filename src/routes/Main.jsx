import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import MainNav from "../components/navigation/MainNav";
import { selectActiveUser } from "../store/auth/authSlice";
import {
  fetchFirstCompany,
  selectCompany,
} from "../store/companies/companySlice";

function Main() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);
  const company = useSelector(selectCompany);

  useEffect(() => {
    dispatch(fetchFirstCompany());
  }, []);

  if (!activeUser) {
    return <Navigate to="/login" />;
  } else if (!company) {
    return <div>loading</div>;
  } else {
    return (
      <div className=" w-screen h-screen flex flex-col items-center">
        {userId !== activeUser.user_id && (
          <Navigate to={`/main/${activeUser.user_id}`} replace={true} />
        )}
        <header className="flex items-center flex-col">
          <h1 className="my-8 text-6xl font-extrabold text-gray-900">
            Welcome back, {activeUser?.first_name}!
          </h1>
          <MainNav userId={activeUser.user_id} active={"main"} />
        </header>
        <main className="mt-32">
          <h2 className="my-2 text-3xl font-extrabold text-gray-900">
            Your company:{" "}
          </h2>
          <h3 className="text-xl">
            <span className=" font-bold">Name:</span> {company.company_name}
          </h3>
          <h3 className="text-xl">
            <span className=" font-bold">Email:</span> {company.company_email}
          </h3>
          <h3 className="text-xl">
            <span className=" font-bold">Phone Number:</span>{" "}
            {company.company_phone_number}
          </h3>
          <h3 className="text-xl">
            <span className=" font-bold">Location:</span>{" "}
            {company.company_location}
          </h3>
          <h3 className="text-xl">
            <span className=" font-bold">Created: </span>
            {new Date(company.date_of_creation).toLocaleDateString("hr")}
          </h3>
        </main>
      </div>
    );
  }
}

export default Main;
