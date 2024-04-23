const Button = ({ children, clickFunction, type, isDisabled, hidden }) => {
  if (hidden) {
    return null;
  } else {
    return (
      <button
        type={type}
        disabled={isDisabled}
        className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-3xl max-h-10"
        onClick={clickFunction ? clickFunction : null}
      >
        {children}
      </button>
    );
  }
};

export default Button;
