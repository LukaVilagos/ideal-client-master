const SelectButton = ({
  children,
  clickFunction,
  type,
  isDisabled,
  hidden,
  isSelected,
}) => {
  if (hidden) {
    return null;
  } else {
    return (
      <button
        type={type}
        disabled={isDisabled}
        className={`w-6 h-6 rounded-full ${
          isSelected ? "bg-[#4865f5]" : "bg-gray-300"
        }`}
        onClick={clickFunction ? clickFunction : null}
      >
        {children}
      </button>
    );
  }
};

export default SelectButton;
