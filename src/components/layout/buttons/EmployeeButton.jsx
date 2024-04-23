const EmployeeButton = ({
  children,
  clickFunction,
  type,
  isDisabled,
  hidden,
}) => {
  if (hidden) {
    return null;
  } else {
    return (
      <button
        type={type}
        disabled={isDisabled}
        className="bg-[#d6d4d4] hover:bg-[#8a8888] text-black font-bold py-2 px-4 rounded-3xl max-h-10"
        onClick={clickFunction ? clickFunction : null}
      >
        {children}
      </button>
    );
  }
};

export default EmployeeButton;
