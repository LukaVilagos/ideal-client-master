import SidebarLink from "../sidebar/SidebarLink";

function DropdownItem({ children, link }) {
  return <SidebarLink link={link}>{children}</SidebarLink>;
}

export default DropdownItem;
