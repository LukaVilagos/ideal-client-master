import { NavLink } from "react-router-dom";

function SidebarLink({ children, link }) {
  return (
    <NavLink to={link}>
      <li className="p-2 m-2">{children}</li>
    </NavLink>
  );
}

export default SidebarLink;
