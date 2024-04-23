import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import LoginButton from "../components/layout/buttons/LoginButton";
import RegisterButton from "../components/layout/buttons/RegisterButton";
import RegisterComponent from "../components/smart-components/RegisterComponent";
import Logo from "../imgs/logo.svg";
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "../store/auth/authSlice";

function Register() {
  const navigate = useNavigate();
  const activeUser = useSelector(selectActiveUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (activeUser && isAuthenticated) {
      navigate(`/main/${activeUser.user_id}`);
    }
  }, [activeUser, isAuthenticated]);

  return (
    <div className=" w-screen h-screen">
      <header className="flex justify-center flex-col items-center pt-16">
        <Link to="/">
          <img src={Logo} alt="logo" className="mb-16 w-full max-w-xl px-4" />
        </Link>
        <div className="flex justify-center gap-16">
          <NavLink to="/login">
            <RegisterButton>login</RegisterButton>
          </NavLink>
          <NavLink to="/register">
            <LoginButton>Register</LoginButton>
          </NavLink>
        </div>
      </header>
      <div className="flex justify-center pt-8 text-red-600">
        {error === "Registration was not successful!" && `${error}`}
      </div>
      <main className="bg-[#1C1B40] pt-16 rounded-t-xl absolute bottom-0 left-1/2 transform -translate-x-1/2  w-full max-w-lg h-1/2">
        <RegisterComponent />
      </main>
    </div>
  );
}

export default Register;
