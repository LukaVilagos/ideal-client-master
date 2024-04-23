import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/auth/authSlice";
import ActiveButton from "../layout/buttons/ActiveButton";
import LogOutButton from "../layout/buttons/LogOutButton";
import NavButton from "../layout/buttons/NavButton";

function MainNav({ userId, active }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex items-center gap-6">
      <nav className="bg-[#1C1B40] rounded-full h-16 flex items-center">
        <NavLink to={`/main/${userId}`}>
          {active === "main" ? (
            <ActiveButton>Main</ActiveButton>
          ) : (
            <NavButton>Main</NavButton>
          )}
        </NavLink>
        <NavLink to={`/reports/${userId}/all`}>
          {active === "reports" ? (
            <ActiveButton>Reports</ActiveButton>
          ) : (
            <NavButton>Reports</NavButton>
          )}
        </NavLink>
        <NavLink to={`/templates/${userId}`}>
          {active === "templates" ? (
            <ActiveButton>Templates</ActiveButton>
          ) : (
            <NavButton>Templates</NavButton>
          )}
        </NavLink>
        <NavLink to={`/creator/${userId}`}>
          {active === "creator" ? (
            <ActiveButton>Creator</ActiveButton>
          ) : (
            <NavButton>Creator</NavButton>
          )}
        </NavLink>
      </nav>
      <LogOutButton clickFunction={logOut}>Log Out</LogOutButton>
    </div>
  );
}

export default MainNav;
