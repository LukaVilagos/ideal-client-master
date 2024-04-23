const DownloadButton = ({
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
        className={`bg-[#4C5C93] hover:bg-[#2f3c68] text-white font-bold py-2 px-4 rounded-3xl max-h-10 ${
          square && "rounded-lg py-2 px-6 max-h-none text-2xl"
        }`}
        onClick={clickFunction ? clickFunction : null}
      >
        {children}
      </button>
    );
  }
};

export default DownloadButton;
