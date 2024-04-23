const SubmitButton = ({
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
        className="bg-[#5158F1] hover:bg-[#242988] text-white font-semibold py-2 px-4 rounded-md uppercase tracking-widest max-h-10"
        onClick={clickFunction ? clickFunction : null}
      >
        {children}
      </button>
    );
  }
};

export default SubmitButton;
