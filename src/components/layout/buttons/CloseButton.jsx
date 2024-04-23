const CloseButton = ({ children, clickFunction, type, isDisabled, hidden }) => {
  if (hidden) {
    return null;
  } else {
    return (
      <button
        type={type}
        disabled={isDisabled}
        className="bg-[#5D72DC] hover:bg-[#4157c3] text-white font-bold py-2 px-4 rounded-3xl max-h-10"
        onClick={clickFunction ? clickFunction : null}
      >
        {children}
      </button>
    );
  }
};

export default CloseButton;
