function LogOutButton({ children, clickFunction }) {
  return (
    <button
      className="hover:bg-[#262395] bg-[#1C1B40] h-16 text-white py-4 px-6 rounded-full"
      onClick={clickFunction ? clickFunction : null}
    >
      {children}
    </button>
  );
}

export default LogOutButton;
