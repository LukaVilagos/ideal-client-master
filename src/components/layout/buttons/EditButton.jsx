const EditButton = ({
  children,
  clickFunction,
  type,
  isDisabled,
  hidden,
  square,
}) => {
  if (hidden) {
    return null;
  } else {
    return (
      <button
        type={type}
        disabled={isDisabled}
        className={`bg-[#3F4792] hover:bg-[#2f3c68] text-white font-bold py-2 px-4 rounded-3xl max-h-10 ${
          square && "rounded-lg py-2 px-6 max-h-none text-2xl"
        }`}
        onClick={clickFunction ? clickFunction : null}
      >
        {children}
      </button>
    );
  }
};

export default EditButton;
