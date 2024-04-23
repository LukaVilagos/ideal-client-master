function NavButton({ children }) {
  return (
    <button className="hover:bg-[#262395] h-16 text-white py-4 px-6 rounded-full">
      {children}
    </button>
  );
}

export default NavButton;
