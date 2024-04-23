function SidebarWrapper({ children }) {
  return (
    <aside
      className={
        "bg-black fixed h-screen w-[var(--sidebar-width)] text-white p-2 flex flex-col overflow-y-scroll"
      }
    >
      {children}
    </aside>
  );
}

export default SidebarWrapper;
