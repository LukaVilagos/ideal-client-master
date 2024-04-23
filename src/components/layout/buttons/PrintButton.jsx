const PrintButton = ({ children, clickFunction, type, isDisabled, hidden }) => {
  if (hidden) {
    return null;
  } else {
    return (
      <button
        type={type}
        disabled={isDisabled}
        className="bg-[#0C1B51] hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-3xl max-h-10"
        onClick={clickFunction ? clickFunction : null}
      >
        {children}
      </button>
    );
  }
};

export default PrintButton;
