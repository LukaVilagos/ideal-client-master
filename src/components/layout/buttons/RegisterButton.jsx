function RegisterButton({ children }) {
  return (
    <button className="rounded-md shadow-md padd py-4 px-8  text-gray-500 border-gray-500 border-2 hover:bg-gray-900 hover:rounded-md hover:text-white">
      <span className="not-italic font-normal text-3xl leading-9 text-center tracking-widest uppercase">
        {children}
      </span>
    </button>
  );
}

export default RegisterButton;
