function LoginButton({ children }) {
  return (
    <button className="bg-gray-900 rounded-md shadow-md padd py-4 px-8">
      <span className="not-italic font-normal text-3xl leading-9 text-center tracking-widest text-white uppercase">
        {children}
      </span>
    </button>
  );
}

export default LoginButton;
