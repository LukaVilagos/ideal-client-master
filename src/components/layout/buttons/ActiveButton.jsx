function ActiveButton({ children }) {
  return (
    <button className="bg-[#262395] h-16 text-white py-4 px-6 rounded-full">
      {children}
    </button>
  );
}

export default ActiveButton;
