const SecondaryLabel = ({ children, referance }) => {
  return (
    <label className=" text-base font-bold" htmlFor={referance}>
      {children}
    </label>
  );
};

export default SecondaryLabel;
